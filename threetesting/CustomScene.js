import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import chroma from "chroma-js";

const colorsGradient = {
  firstColor: "#4b08ba",
  secondColor: "#f7ff50",
  steps: 32,
};

const hexToRgbTreeJs = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : null;
};

export default function CustomScene() {
  const sceneRef = useRef();

  const [meshes, setMeshes] = useState([]);
  const totalMeshes = 32;
  const hasRun = useRef(false);

  /*useEffect(()=>{
    if(meshRef.current){
      console.log("mesh: ",meshRef.current)
      addboxes()
    }
  },[])
*/
  const updateColors = (meshes) => {
    const colors = chroma
      .scale([colorsGradient.firstColor, colorsGradient.secondColor])
      .mode("lch")
      .colors(colorsGradient.steps);
    console.log(colors);
    let colorIndex = -1;

    const temp = [];

    const container = new THREE.Object3D();
    for (let index = 0; index < totalMeshes; index++) {
      const boxMesh = meshes[index];

      index % Math.round(totalMeshes / colorsGradient.steps) === 0
        ? colorIndex++
        : colorIndex;

      boxMesh.material = new THREE.MeshPhongMaterial({
        specular: 0x111111,
        shininess: 100,
        emissive: 0x0,
      });
      boxMesh.material.color = hexToRgbTreeJs(colors[colorIndex]);
      boxMesh.material.needsUpdate = true;
      temp.push(boxMesh);
      container.add(boxMesh);
      sceneRef.current.add(boxMesh);
    }
    hasRun.current = true;
    setMeshes(temp);
  };

  const addboxes = () => {
    const animatedMeshes = [];

    const temp = [];
    const geometry = new THREE.BoxGeometry(1, 1, 0.1);
    const material = new THREE.MeshPhongMaterial({
      specular: 0x111111,
      shininess: 100,
      emissive: 0x0,
    });
    const meshRef = new THREE.Mesh(geometry, material);
    meshRef.position = new THREE.Vector3(0, 1, 0);

    for (let index = 0; index < totalMeshes; index++) {
      const boxMesh = meshRef.clone();
      boxMesh.position.z = -(index * 0.1);
      temp[index] = boxMesh;
      animatedMeshes[index] = boxMesh;
    }

    //sceneRef.current.add(container);
    updateColors(temp);
  };

  useFrame(() => {
    if (!hasRun.current) addboxes();
  });

  return (
    <scene ref={sceneRef}>
      <ambientLight color="#ffffff" />
    </scene>
  );
}
