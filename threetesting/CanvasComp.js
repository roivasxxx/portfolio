import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import chroma from "chroma-js";
import CustomScene from "./CustomScene";

export default function CanvasComp() {
  return (
    <Canvas
      camera={{
        fov: 20,
        aspect: window.innerWidth / window.innerHeight,
        near: 1,
        far: 1000,
        position: [-10, 10, 10],
      }}
      gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}
      linear
    >
      <CustomScene />
    </Canvas>
  );
}
