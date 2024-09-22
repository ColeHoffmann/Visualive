import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeDScene = ({ viewerCount }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Function to create cubes based on viewer count
    const createCubes = (count) => {
      const cubes = [];
      for (let i = 0; i < count; i++) {
        const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2); // Fixed size for cubes
        const material = new THREE.MeshBasicMaterial({
          color: Math.random() * 0xffffff,
        }); // Random color for each cube
        const cube = new THREE.Mesh(geometry, material);

        // Position cubes in a grid or random positions
        cube.position.x = (Math.random() - 0.5) * 10; // Random x position
        cube.position.y = (Math.random() - 0.5) * 10; // Random y position
        cube.position.z = (Math.random() - 0.5) * 10; // Random z position

        cubes.push(cube);
        scene.add(cube);
      }
      return cubes;
    };

    // Create initial cubes based on viewer count
    const cubes = createCubes(viewerCount);

    // Position the camera
    camera.position.z = 5;

    // Animation loop to render the scene
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate all cubes for animation
      cubes.forEach((cube) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on component unmount
    return () => {
      renderer.dispose();
    };
  }, [viewerCount]); // Re-run effect when viewerCount changes

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }}></div>;
};

export default ThreeDScene;
