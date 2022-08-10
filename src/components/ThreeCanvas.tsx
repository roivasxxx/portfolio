import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import chroma from "chroma-js";
import gsap from "gsap";

export default function ThreeCanvas() {
  const mesh = useRef(null);
  const [meshes, setMeshes] = useState();

  const animatedMeshes = useRef([]);
  const scene = useRef(null);

  const colorsGradient = {
    firstColor: "#4b08ba",
    secondColor: "#f7ff50",
    steps: 32,
  };
  useEffect(() => {
    if (meshes?.length > 0) {
      //updateColors();
    }
  }, [meshes]);

  const [colors, setColors] = useState(
    chroma
      .scale([colorsGradient.firstColor, colorsGradient.secondColor])
      .mode("lch")
      .colors(colorsGradient.steps)
  );

  const hexToRgbTreeJs = (hex: any) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result
      ? {
          r: parseInt(result[1], 16) / 255,
          g: parseInt(result[2], 16) / 255,
          b: parseInt(result[3], 16) / 255,
        }
      : null;
  };

  const totalMeshes: number = 32;
  const matParams = {
    specular: 0x111111,
    shininess: 100,
    emissive: 0x0,
  };

  const updateColors = () => {
    console.log(meshes);
    const tempColors = chroma
      .scale([colorsGradient.firstColor, colorsGradient.secondColor])
      .mode("lch")
      .colors(colorsGradient.steps);

    let colorIndex = -1;

    for (let index = 0; index < totalMeshes; index++) {
      const boxMesh = meshes[index];
      index % Math.round(totalMeshes / colorsGradient.steps) === 0
        ? colorIndex++
        : colorIndex;
      console.log(boxMesh);
      if (!boxMesh.material) {
        boxMesh.material = new THREE.MeshPhongMaterial(matParams);
      }

      boxMesh.material.color = hexToRgbTreeJs(tempColors[colorIndex]);
    }
    setColors(tempColors);
  };

  const addBoxes = () => {
    const container = new THREE.Group();
    const temp = [];

    for (let index = 0; index < totalMeshes; index++) {
      mesh.current.position.z = -(index * 0.1);

      temp.push(mesh.current);
      animatedMeshes.current[index] = mesh.current;

      container.add(mesh.current);
    }
    console.log(container);
    if (temp.every((el) => el.geometry && el.material)) {
      //scene.current.add(container);
      setMeshes(temp);
    }
  };

  const GetBoxMesh = () => {
    useFrame(() => {
      addBoxes();
    });
    return (
      <mesh position={[0, 1, 0]} castShadow receiveShadow ref={mesh}>
        <boxGeometry attach="geometry" args={[1, 1, 0.1]} />
        <meshPhongMaterial attach="material" args={[matParams]} color="red" />
      </mesh>
    );
  };

  const startAnimations = () => {
    animatedMeshes.current.forEach((mesh: any, index: number) => {
      gsap.to(mesh.rotation, 2, {
        onComplete: (index) => {
          if (index === animatedMeshes.current.length - 1) {
            reverseAnimations();
          }
        },
        onCompleteParams: [index],
        z: radians(-90),
        delay: index * 0.05,
        ease: Elastic.easeOut.config(1.5, 0.4),
      });
    });
  };

  const reverseAnimations = () => {
    animatedMeshes.current = animatedMeshes.current.reverse();
    animatedMeshes.current.forEach((mesh: any, index: number) => {
      gsap.to(mesh.rotation, 2, {
        onComplete: (index) => {
          if (index === animatedMeshes.current.length - 1) {
            animatedMeshes.current = animatedMeshes.current.reverse();
            startAnimations();
          }
        },
        onCompleteParams: [index],
        z: radians(0),
        delay: index * 0.05,
        ease: Elastic.easeOut.config(1.5, 0.4),
      });
    });
  };

  const radians = (degrees: number) => {
    return (degrees * Math.PI) / 180;
  };

  return (
    <div className="w-1/2 h-1/2">
      <Canvas>
        <scene ref={scene}>
          <ambientLight />
          <GetBoxMesh />
        </scene>
      </Canvas>
    </div>
  );
}
