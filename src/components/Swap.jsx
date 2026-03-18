import { useState, useEffect, useMemo } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { motion, AnimatePresence } from 'framer-motion'
import { PublicKey, VersionedTransaction } from '@solana/web3.js'
import { Buffer } from 'buffer'
import Navbar from './Navbar'

const CORTISOL_TOKEN_ADDRESS = '9AyLH5Puifc7v9MkTgA36JabS4wiVTEZ3aEPeNoTpump'
const SOL_MINT = 'So11111111111111111111111111111111111111112'

const Swap = () => {
  const { publicKey, signTransaction, connected } = useWallet()
  const { connection } = useConnection()
  
  const [fromToken, setFromToken] = useState(null)
  const [toToken, setToToken] = useState(null)
  const [tokens, setTokens] = useState([])
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [price, setPrice] = useState(null)
  const [priceImpact, setPriceImpact] = useState(null)
  const [showTokenSelect, setShowTokenSelect] = useState(null)
  const [quoteLoading, setQuoteLoading] = useState(false)
  const [isSwapping, setIsSwapping] = useState(false)
  const [slippage, setSlippage] = useState(0.5)
  const [cortisolImage, setCortisolImage] = useState(null)
  const [balances, setBalances] = useState({ SOL: '0', CORTISOL: '0' })
  const [swapStatus, setSwapStatus] = useState({ type: '', message: '' })

  // Fetch token data and prices
  useEffect(() => {
    fetchTokenData()
    const interval = setInterval(fetchTokenData, 30000)
    return () => clearInterval(interval)
  }, [])

  // Fetch balances when wallet connects
  useEffect(() => {
    if (connected && publicKey) {
      fetchBalances()
      const interval = setInterval(fetchBalances, 10000)
      return () => clearInterval(interval)
    } else {
      setBalances({ SOL: '0', CORTISOL: '0' })
    }
  }, [connected, publicKey])

  const fetchBalances = async () => {
    if (!publicKey) return
    try {
      const solBalance = await connection.getBalance(publicKey, 'confirmed')
      
      let cortisolBal = '0'
      try {
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
          mint: new PublicKey(CORTISOL_TOKEN_ADDRESS)
        }, 'confirmed')
        
        if (tokenAccounts.value.length > 0) {
          cortisolBal = tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmountString
        }
      } catch (e) {
        console.warn('Token account fetch failed')
      }
      
      setBalances({
        SOL: (solBalance / 1e9).toFixed(4),
        CORTISOL: parseFloat(cortisolBal).toFixed(2)
      })
    } catch (err) {
      console.error('Error fetching balances:', err)
    }
  }

  const fetchTokenData = async () => {
    try {
      const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${CORTISOL_TOKEN_ADDRESS}`)
      const data = await response.json()
      if (data.pairs && data.pairs[0]) {
        const pair = data.pairs[0]
        setPrice(parseFloat(pair.priceUsd))
        const img = pair.baseToken.logoURI || pair.info?.imageUrl
        setCortisolImage(img)
        
        const solToken = { 
          symbol: 'SOL', 
          name: 'Solana', 
          address: SOL_MINT, 
          decimals: 9, 
          logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png' 
        }
        const cortisolToken = { 
          symbol: 'CORTISOL', 
          name: 'CORTISOL', 
          address: CORTISOL_TOKEN_ADDRESS, 
          decimals: 6, 
          logo: img 
        }
        
        setTokens([solToken, cortisolToken])
        if (!fromToken) setFromToken(solToken)
        if (!toToken) setToToken(cortisolToken)
      }
    } catch (err) {
      console.error('Failed to fetch data:', err)
    }
  }

  useEffect(() => {
    if (!fromToken || !toToken) return
    
    const fetchQuote = async () => {
      if (!fromAmount || parseFloat(fromAmount) <= 0) {
        setToAmount('')
        setPriceImpact(null)
        return
      }

      setQuoteLoading(true)
      
      try {
        const inputAmount = Math.floor(parseFloat(fromAmount) * Math.pow(10, fromToken.decimals))
        
        const response = await fetch(
          `https://quote-api.jup.ag/v6/quote?inputMint=${fromToken.address}&outputMint=${toToken.address}&amount=${inputAmount}&slippageBps=${Math.round(slippage * 100)}&onlyDirectRoutes=false`
        )
        
        const data = await response.json()
        
        if (data && data.outAmount) {
          const outAmount = parseInt(data.outAmount) / Math.pow(10, toToken.decimals)
          setToAmount(outAmount.toFixed(6))
          setPriceImpact(parseFloat(data.priceImpactPct))
        } else {
          if (price) {
            if (fromToken.symbol === 'SOL' && toToken.symbol === 'CORTISOL') {
              setToAmount((parseFloat(fromAmount) / price).toFixed(2))
            } else if (fromToken.symbol === 'CORTISOL' && toToken.symbol === 'SOL') {
              setToAmount((parseFloat(fromAmount) * price).toFixed(6))
            }
          }
        }
      } catch (err) {
        console.error('Quote error:', err)
        if (price && fromAmount) {
          if (fromToken.symbol === 'SOL' && toToken.symbol === 'CORTISOL') {
            setToAmount((parseFloat(fromAmount) / price).toFixed(2))
          } else if (fromToken.symbol === 'CORTISOL' && toToken.symbol === 'SOL') {
            setToAmount((parseFloat(fromAmount) * price).toFixed(6))
          }
        }
      } finally {
        setQuoteLoading(false)
      }
    }

    const debounce = setTimeout(fetchQuote, 500)
    return () => clearTimeout(debounce)
  }, [fromAmount, fromToken, toToken, price, slippage])

  const handleSwapTokens = () => {
    if (!fromToken || !toToken) return
    const tempT = fromToken
    setFromToken(toToken)
    setToToken(tempT)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const executeSwap = async () => {
    if (!connected || !publicKey || !signTransaction) {
      setSwapStatus({ type: 'error', message: 'Connect wallet to swap' })
      return
    }
    
    setSwapStatus({ type: 'loading', message: 'Preparing transaction...' })
    
    try {
      const inputAmount = Math.floor(parseFloat(fromAmount) * Math.pow(10, fromToken.decimals))
      
      const quoteResponse = await fetch(
        `https://quote-api.jup.ag/v6/quote?inputMint=${fromToken.address}&outputMint=${toToken.address}&amount=${inputAmount}&slippageBps=${Math.round(slippage * 100)}`
      )
      const quoteData = await quoteResponse.json()
      
      if (!quoteData || !quoteData.inAmount) {
        throw new Error('No quote received')
      }
      
      setSwapStatus({ type: 'loading', message: 'Processing swap...' })
      
      const { swapTransaction } = await fetch('https://quote-api.jup.ag/v6/swap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quoteResponse: quoteData,
          userPublicKey: publicKey.toString(),
          wrapAndUnwrapSol: true
        })
      }).then(res => res.json())
      
      const transaction = VersionedTransaction.deserialize(Buffer.from(swapTransaction, 'base64'))
      const signed = await signTransaction(transaction)
      const signature = await connection.sendRawTransaction(signed.serialize(), { skipPreflight: true })
      
      setSwapStatus({ type: 'success', message: `Swap confirmed! ${signature.slice(0, 8)}...` })
      fetchBalances()
      
    } catch (err) {
      console.error('Swap error:', err)
      setSwapStatus({ type: 'error', message: 'Swap failed. Try again.' })
    }
  }

  const selectToken = (token, side) => {
    if (side === 'from') {
      setFromToken(token)
    } else {
      setToToken(token)
    }
    setShowTokenSelect(null)
    setFromAmount('')
    setToAmount('')
  }

  const formatBalance = (symbol) => {
    return balances[symbol] || '0.00'
  }

  if (!fromToken || !toToken) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#050505' }}>
        <div className="w-8 h-8 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col selection:bg-teal-500/30 relative" style={{ background: '#050505' }}>
      <Navbar />
      
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(20, 184, 166, 0.08) 0%, transparent 50%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 80%, rgba(13, 148, 136, 0.05) 0%, transparent 50%)' }} />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, mixBlendMode: 'overlay' }} />
      </div>

      <header className="relative z-50 flex items-center justify-between px-8 py-6">
        <motion.a 
          href="/" 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 group"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl overflow-hidden border border-white/10 group-hover:border-teal-500/50 transition-all duration-500 transform group-hover:rotate-[15deg]">
              {cortisolImage && <img src={cortisolImage} alt="C" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />}
            </div>
            <div className="absolute -inset-1 bg-teal-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold tracking-[0.4em] text-[10px] uppercase leading-none mb-1" style={{ fontFamily: 'Space Mono, monospace' }}>
              Cortisol
            </span>
            <span className="text-white/20 text-[8px] uppercase tracking-[0.2em] font-medium">Protocol</span>
          </div>
        </motion.a>
        
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors font-bold" style={{ fontFamily: 'Space Mono' }}>Home</a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="wallet-adapter-custom-wrapper">
              <WalletMultiButton className="!bg-white !text-black !h-10 !px-6 !rounded-2xl !text-[10px] !font-bold !uppercase !tracking-[0.2em] !transition-all hover:!bg-teal-500 hover:!scale-[1.02]" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[440px] relative">
          <AnimatePresence>
            {swapStatus.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className={`absolute -top-16 left-0 right-0 p-3 rounded-xl text-center text-xs font-medium backdrop-blur-xl border ${
                  swapStatus.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                  swapStatus.type === 'success' ? 'bg-teal-500/10 border-teal-500/20 text-teal-400' :
                  'bg-white/5 border-white/10 text-white/60'
                }`}
              >
                {swapStatus.type === 'loading' && <span className="inline-block w-2 h-2 rounded-full border border-current border-t-transparent animate-spin mr-2" />}
                {swapStatus.message}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="rounded-[32px] overflow-hidden border border-white/[0.06] bg-black/40 backdrop-blur-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">
            <div className="p-8">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-sm font-bold tracking-[0.2em] text-white/90 uppercase" style={{ fontFamily: 'Space Mono, monospace' }}>Swap</h2>
                <div className="flex gap-1.5 p-1 rounded-lg bg-white/[0.03]">
                  {[0.5, 1.0, 3.0].map(val => (
                    <button
                      key={val} onClick={() => setSlippage(val)}
                      className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
                        slippage === val ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/50'
                      }`}
                    >
                      {val}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <div className="group px-6 py-5 rounded-[24px] bg-white/[0.03] border border-white/[0.02] hover:bg-white/[0.05] transition-all duration-300">
                  <div className="flex justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Sell</span>
                    {connected && (
                      <div className="flex items-center gap-2">
                        <button onClick={() => { const bal = formatBalance(fromToken.symbol); if (bal !== '0.00' && bal !== '0') setFromAmount(bal) }}
                          className="text-[8px] px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-500 hover:bg-teal-500/20 transition-colors uppercase font-bold"
                        >
                          Max
                        </button>
                        <span className="text-[10px] font-bold text-white/20 uppercase tracking-tight">Balance: {formatBalance(fromToken.symbol)}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <input type="number" value={fromAmount} onChange={(e) => setFromAmount(e.target.value)} placeholder="0.00"
                        className="w-full bg-transparent text-3xl font-light outline-none text-white placeholder:text-white/10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                    <button onClick={() => setShowTokenSelect('from')} className="flex-shrink-0 flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-2xl bg-white/[0.05] hover:bg-white/10 border border-white/5 transition-colors">
                      <img src={fromToken.logo} alt="" className="w-6 h-6 rounded-full grayscale" />
                      <span className="text-xs font-bold text-white tracking-wider">{fromToken.symbol}</span>
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-white/30"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </div>

                <div className="relative h-2 flex justify-center items-center z-10">
                  <button onClick={handleSwapTokens} className="group w-10 h-10 rounded-full bg-[#111] border border-white/[0.08] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-500">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 group-hover:opacity-100 transition-opacity"><path d="M7 16V4M7 4L3 8M7 4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/></svg>
                  </button>
                </div>

                <div className="group px-6 py-5 rounded-[24px] bg-white/[0.03] border border-white/[0.02] hover:bg-white/[0.05] transition-all duration-300">
                  <div className="flex justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Buy</span>
                    {connected && <span className="text-[10px] font-bold text-white/20 uppercase tracking-tight">Balance: {formatBalance(toToken.symbol)}</span>}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                      <input type="number" value={toAmount} readOnly placeholder="0.00" className="w-full bg-transparent text-3xl font-light outline-none text-white placeholder:text-white/10 cursor-default" />
                      {quoteLoading && <div className="absolute left-0 top-0 bottom-0 flex items-center"><div className="w-12 h-8 bg-white/5 rounded animate-pulse" /></div>}
                    </div>
                    <button onClick={() => setShowTokenSelect('to')} className="flex-shrink-0 flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-2xl bg-white/[0.05] hover:bg-white/10 border border-white/5 transition-colors">
                      <img src={toToken.logo} alt="" className="w-6 h-6 rounded-full grayscale" />
                      <span className="text-xs font-bold text-white tracking-wider">{toToken.symbol}</span>
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-white/30"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3 px-2">
                {price && (
                  <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase">
                    <span className="text-white/20">Exchange Rate</span>
                    <span className="text-white/60 tabular-nums">1 {toToken.symbol} = ${price.toFixed(6)}</span>
                  </div>
                )}
                {priceImpact !== null && (
                  <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase">
                    <span className="text-white/20">Price Impact</span>
                    <span className={priceImpact > 1 ? 'text-red-500' : 'text-teal-500/60'}>{priceImpact.toFixed(2)}%</span>
                  </div>
                )}
              </div>

              <button onClick={executeSwap} disabled={!connected || !fromAmount} className="w-full mt-10 py-5 rounded-[20px] font-bold text-[11px] uppercase tracking-[0.3em] transition-all duration-500 disabled:opacity-20 disabled:cursor-not-allowed relative overflow-hidden group" style={{ background: 'white', color: 'black' }}>
                <span className="relative z-10">{!connected ? 'Connect Wallet' : !fromAmount ? 'Enter Amount' : 'Swap'}</span>
                <div className="absolute inset-0 bg-teal-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {showTokenSelect && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl">
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-xs bg-[#0a0a0a] border border-white/10 rounded-[32px] overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Select Token</h3>
                    <button onClick={() => setShowTokenSelect(null)} className="text-white/20 hover:text-white transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
                  </div>
                  <div className="space-y-2">
                    {tokens.map(token => (
                      <button key={token.address} onClick={() => selectToken(token, showTokenSelect)} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${ (showTokenSelect === 'from' ? fromToken : toToken).address === token.address ? 'bg-white/5 border border-white/10' : 'hover:bg-white/[0.03] border border-transparent' }`}>
                        <img src={token.logo} alt="" className="w-10 h-10 rounded-full grayscale" />
                        <div className="text-left"><p className="text-sm font-bold text-white tracking-tight">{token.symbol}</p><p className="text-[10px] font-medium text-white/30 uppercase tracking-tighter">{token.name}</p></div>
                        {connected && <div className="ml-auto text-right"><p className="text-[10px] font-bold text-white/50">{formatBalance(token.symbol)}</p></div>}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 px-8 py-8 flex justify-between items-center border-t border-white/5">
        <span className="text-[10px] font-bold text-white/10 uppercase tracking-widest">Protocol V1.0.4</span>
        <p className="text-[10px] font-bold text-white/10 uppercase tracking-widest">Secured by Jupiter</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .wallet-adapter-button {
          background-color: white !important;
          color: black !important;
          height: 40px !important;
          padding: 0 24px !important;
          border-radius: 12px !important;
          font-size: 11px !important;
          font-weight: 800 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.15em !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          font-family: "Space Mono", monospace !important;
        }
        .wallet-adapter-button:hover {
          background-color: #14b8a6 !important;
          transform: translateY(-1px);
          box-shadow: 0 10px 20px -5px rgba(20, 184, 166, 0.3);
        }
        .wallet-adapter-modal-wrapper {
          background: #0a0a0a !important;
          border: 1px solid rgba(255,255,255,0.05) !important;
          border-radius: 24px !important;
          font-family: "Space Mono", monospace !important;
          box-shadow: 0 0 100px rgba(0,0,0,0.8) !important;
        }
        .wallet-adapter-modal-title {
          font-weight: 800 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.2em !important;
          font-size: 14px !important;
          color: white !important;
          padding: 40px 20px 20px !important;
        }
        .wallet-adapter-modal-button-close {
          background: rgba(255,255,255,0.05) !important;
          border-radius: 50% !important;
          margin: 15px !important;
        }
        .wallet-adapter-modal-list {
          margin: 0 20px 20px !important;
        }
        .wallet-adapter-modal-list .wallet-adapter-button {
          background: rgba(255,255,255,0.02) !important;
          color: white !important;
          border: 1px solid rgba(255,255,255,0.05) !important;
          margin-bottom: 8px !important;
          border-radius: 16px !important;
          justify-content: space-between !important;
          height: 56px !important;
          width: 100% !important;
        }
        .wallet-adapter-modal-list .wallet-adapter-button:hover {
          background: rgba(255,255,255,0.05) !important;
          border-color: #14b8a6 !important;
        }
      `}} />
    </div>
  )
}

export default Swap
