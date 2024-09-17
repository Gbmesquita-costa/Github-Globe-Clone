"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";

import ThreeGlobe from "three-globe";
import { useThree, Object3DNode, Canvas, extend } from "@react-three/fiber";

import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

import countries from "../data/globe.json";

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: Object3DNode<ThreeGlobe, typeof ThreeGlobe>;
  }
}

extend({ ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

let numbersOfRings: number[] = [1];

const globeConfig = {
  pointSize: 4,
  globeColor: "#8C5CF5",
  showAtmosphere: true,
  atmosphereColor: "#FFFFFF",
  atmosphereAltitude: 0.05,
  emissive: "#062056",
  emissiveIntensity: 0.05,
  shininess: 0.5,
  polygonColor: "rgba(255,255,255,0.5)",
  ambientLight: "#38bdf8",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 2,
  initialPosition: { lat: 22.3193, lng: 114.1694 },
  autoRotate: true,
  autoRotateSpeed: 0.3,
};

const Globe = (): JSX.Element => {
  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];

  const sampleArcs: Position[] = [
    {
      order: 1,
      startLat: 40.7128,
      startLng: -74.006, // Nova York, EUA
      endLat: 48.8566,
      endLng: 2.3522, // Paris, França
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 2,
      startLat: 35.6895,
      startLng: 139.6917, // Tóquio, Japão
      endLat: -33.8688,
      endLng: 151.2093, // Sydney, Austrália
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 3,
      startLat: 51.5074,
      startLng: -0.1278, // Londres, Reino Unido
      endLat: 55.7558,
      endLng: 37.6173, // Moscou, Rússia
      arcAlt: 0.25,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 4,
      startLat: -23.5505,
      startLng: -46.6333, // São Paulo, Brasil
      endLat: -34.6037,
      endLng: -58.3816, // Buenos Aires, Argentina
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 5,
      startLat: 37.7749,
      startLng: -122.4194, // San Francisco, EUA
      endLat: 1.3521,
      endLng: 103.8198, // Singapura
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 6,
      startLat: 28.6139,
      startLng: 77.209, // Nova Délhi, Índia
      endLat: -26.2041,
      endLng: 28.0473, // Joanesburgo, África do Sul
      arcAlt: 0.35,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 7,
      startLat: 19.4326,
      startLng: -99.1332, // Cidade do México, México
      endLat: 40.4168,
      endLng: -3.7038, // Madri, Espanha
      arcAlt: 0.28,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 8,
      startLat: 55.6761,
      startLng: 12.5683, // Copenhague, Dinamarca
      endLat: 60.1695,
      endLng: 24.9355, // Helsinque, Finlândia
      arcAlt: 0.22,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 9,
      startLat: 39.9042,
      startLng: 116.4074, // Pequim, China
      endLat: -22.9068,
      endLng: -43.1729, // Rio de Janeiro, Brasil
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 10,
      startLat: 52.52,
      startLng: 13.405, // Berlim, Alemanha
      endLat: 41.9028,
      endLng: 12.4964, // Roma, Itália
      arcAlt: 0.25,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 11,
      startLat: -33.9249,
      startLng: 18.4241, // Cidade do Cabo, África do Sul
      endLat: 34.0522,
      endLng: -118.2437, // Los Angeles, EUA
      arcAlt: 0.35,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 12,
      startLat: -36.8485,
      startLng: 174.7633, // Auckland, Nova Zelândia
      endLat: 43.6532,
      endLng: -79.3832, // Toronto, Canadá
      arcAlt: 0.32,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 13,
      startLat: 31.2304,
      startLng: 121.4737, // Xangai, China
      endLat: 37.5665,
      endLng: 126.978, // Seul, Coreia do Sul
      arcAlt: 0.25,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 14,
      startLat: 30.0444,
      startLng: 31.2357, // Cairo, Egito
      endLat: 6.5244,
      endLng: 3.3792, // Lagos, Nigéria
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 15,
      startLat: -1.2921,
      startLng: 36.8219, // Nairóbi, Quênia
      endLat: 14.5995,
      endLng: 120.9842, // Manila, Filipinas
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
  ];

  const [globeData, setGlobeData] = useState<
    | {
        size: number;
        order: number;
        color: (t: number) => string;
        lat: number;
        lng: number;
      }[]
    | null
  >(null);

  const globeRef = useRef<ThreeGlobe | null>(null);

  const _buildMaterial = useCallback(() => {
    if (!globeRef.current) return;

    const globeMaterial = globeRef.current.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };

    globeMaterial.color = new Color(globeConfig.globeColor);
    globeMaterial.emissive = new Color(globeConfig.emissive);
    globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
    globeMaterial.shininess = globeConfig.shininess || 0.9;
  }, []);

  useEffect(() => {
    const arcs = sampleArcs;
    const worker = new Worker(new URL("../globe-worker.ts", import.meta.url));

    worker.postMessage({ type: "processData", data: arcs });
    worker.postMessage({
      type: "numbersOfRings",
      data: {
        min: 0,
        max: sampleArcs.length,
        count: Math.floor((sampleArcs.length * 4) / 5),
      },
    });

    worker.onmessage = ({ data: { type, data } }) => {
      switch (type) {
        case "data":
          const processedData = data.map((item: any) => ({
            ...item,
            color: (t: number) =>
              `rgba(${item.color.r}, ${item.color.g}, ${item.color.b}, ${
                1 - t
              })`,
          }));

          setGlobeData(processedData);
          break;
        case "rings":
          numbersOfRings = data;
          break;
      }
    };

    return () => {
      worker.terminate();
    };
  }, []);

  useEffect(() => {
    _buildMaterial();
  }, [_buildMaterial]);

  useEffect(() => {
    if (globeRef.current && globeData) {
      globeRef.current
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .showAtmosphere(globeConfig.showAtmosphere)
        .atmosphereColor(globeConfig.atmosphereColor)
        .atmosphereAltitude(globeConfig.atmosphereAltitude)
        .hexPolygonColor(() => globeConfig.polygonColor);

      startAnimation();
    }
  }, [globeData]);

  const startAnimation = () => {
    if (!globeRef.current || !globeData) return;

    globeRef.current
      .arcsData(sampleArcs)
      .arcStartLat((d) => (d as { startLat: number }).startLat)
      .arcStartLng((d) => (d as { startLng: number }).startLng)
      .arcEndLat((d) => (d as { endLat: number }).endLat)
      .arcEndLng((d) => (d as { endLng: number }).endLng)
      .arcColor((e: any) => (e as { color: string }).color)
      .arcAltitude((e) => (e as { arcAlt: number }).arcAlt)
      .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
      .arcDashLength(globeConfig.arcLength)
      .arcDashInitialGap((e) => (e as { order: number }).order)
      .arcDashGap(15)
      .arcDashAnimateTime(() => globeConfig.arcTime);

    globeRef.current
      .ringsData([])
      .ringColor((e: any) => (t: any) => e.color(t))
      .ringMaxRadius(globeConfig.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(
        (globeConfig.arcTime * globeConfig.arcLength) / globeConfig.rings
      );
  };

  useEffect(() => {
    if (!globeRef.current || !globeData) return;

    globeRef.current.ringsData(
      globeData.filter((d, i) => numbersOfRings.includes(i))
    );
  }, [globeData]);

  return (
    <>
      <threeGlobe ref={globeRef} />
    </>
  );
};

function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    gl.setSize(size.width, size.height);
    gl.toneMappingExposure = 1.1;
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
  }, [gl, size]);

  return null;
}

function World() {
  const scene = new Scene();
  scene.fog = new Fog(0xffffff, 400, 2000);

  return (
    <Canvas scene={scene} camera={new PerspectiveCamera(50, aspect, 180, 1800)}>
      <WebGLRendererConfig />
      <ambientLight color={globeConfig?.ambientLight} intensity={0.6} />

      <directionalLight
        color={globeConfig?.directionalLeftLight}
        position={new Vector3(-400, 100, 400)}
      />

      <directionalLight
        color={globeConfig?.directionalTopLight}
        position={new Vector3(-200, 500, 200)}
      />

      <pointLight
        color={globeConfig?.pointLight}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />

      <Globe />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotateSpeed={1}
        autoRotate={true}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}

export default World;
