import { useEffect, useRef } from 'react'

const AnimatedBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) return

    let animationId
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    
    resize()
    window.addEventListener('resize', resize)

    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `

    const fragmentShaderSource = `
      precision highp float;
      
      uniform vec2 resolution;
      uniform float time;
      
      // Simplex noise functions
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
      
      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }
      
      float fbm(vec2 p) {
        float f = 0.0;
        f += 0.5000 * snoise(p); p *= 2.02;
        f += 0.2500 * snoise(p); p *= 2.03;
        f += 0.1250 * snoise(p); p *= 2.01;
        f += 0.0625 * snoise(p);
        return f;
      }
      
      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec2 p = uv * 2.0 - 1.0;
        p.x *= resolution.x / resolution.y;
        
        // Base gradient - center brighter
        float dist = length(p * 0.7);
        vec3 baseColor = mix(vec3(0.071, 0.102, 0.184), vec3(0.019, 0.027, 0.035), dist);
        baseColor = mix(vec3(0.055, 0.082, 0.153), baseColor, smoothstep(0.0, 0.8, 1.0 - dist));
        
        // Panel grid using UV modulation
        float gridScale = 5.0;
        vec2 grid = p * gridScale;
        
        // Irregular panel edges using noise
        float edgeNoise = fbm(grid * 0.3 + time * 0.01) * 0.15;
        vec2 panelUV = fract(grid + edgeNoise);
        
        // Panel shape with soft edges
        float panel = smoothstep(0.0, 0.08, panelUV.x) * smoothstep(0.0, 0.08, panelUV.y);
        panel *= smoothstep(0.0, 0.08, 1.0 - panelUV.x) * smoothstep(0.0, 0.08, 1.0 - panelUV.y);
        
        // Per-panel variation
        vec2 panelId = floor(grid + edgeNoise);
        float panelNoise = snoise(panelId * 0.5) * 0.5 + 0.5;
        
        // Surface texture - matte glass look
        float surfaceNoise = fbm(p * 8.0 + panelId) * 0.03;
        
        // Panel brightness variation
        float panelBrightness = 0.015 + panelNoise * 0.012 + surfaceNoise;
        
        // Apply panels to base
        vec3 color = baseColor;
        color += vec3(panelBrightness * panel);
        
        // Lighting animation - slow drift
        vec2 lightPos = vec2(
          sin(time * 0.015) * 0.6,
          cos(time * 0.012 + 0.5) * 0.4
        );
        
        float lightDist = length(p - lightPos);
        
        // Soft blue glow
        vec3 glowColor1 = vec3(0.118, 0.227, 0.541); // #1E3A8A
        vec3 glowColor2 = vec3(0.114, 0.306, 0.847); // #1D4ED8
        vec3 glowColor3 = vec3(0.145, 0.388, 0.922); // #2563EB
        
        float glow = 1.0 - smoothstep(0.0, 1.8, lightDist);
        glow = pow(glow, 3.0) * 0.4;
        
        // Animate glow color
        float glowPhase = time * 0.02;
        vec3 glowColor = mix(glowColor1, glowColor2, sin(glowPhase) * 0.5 + 0.5);
        glowColor = mix(glowColor, glowColor3, sin(glowPhase * 0.7 + 1.0) * 0.5 + 0.5);
        
        // Apply glow to panels
        color += glowColor * glow * panel * 0.6;
        
        // Add subtle ambient occlusion at panel edges
        float ao = smoothstep(0.0, 0.15, panelUV.x) * smoothstep(0.0, 0.15, panelUV.y);
        ao *= smoothstep(0.0, 0.15, 1.0 - panelUV.x) * smoothstep(0.0, 0.15, 1.0 - panelUV.y);
        color *= 0.85 + ao * 0.15;
        
        // Edge darkening
        color *= 1.0 - smoothstep(0.7, 1.2, dist) * 0.3;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `

    const createShader = (type, source) => {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader))
        return null
      }
      return shader
    }

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource)

    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program))
      return
    }

    gl.useProgram(program)

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1
    ]), gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const resolutionLocation = gl.getUniformLocation(program, 'resolution')
    const timeLocation = gl.getUniformLocation(program, 'time')

    let startTime = Date.now()

    const render = () => {
      const currentTime = (Date.now() - startTime) * 0.001
      
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.uniform1f(timeLocation, currentTime)
      
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      
      animationId = requestAnimationFrame(render)
    }
    
    render()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ 
        background: '#05070F',
        pointerEvents: 'none'
      }}
    />
  )
}

export default AnimatedBackground
