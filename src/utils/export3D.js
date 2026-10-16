import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter.js';

// Helper to trigger browser file download
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// 1. Export 3D Scene / Assembly to GLTF (.GLB) for Blender
export function exportToBlenderGLTF(sceneOrGroup, filename = 'tandem-paraglider-blender.glb') {
  if (!sceneOrGroup) {
    console.error('No 3D object provided for export');
    return;
  }

  const exporter = new GLTFExporter();
  const options = {
    binary: true,           // Output .GLB binary format
    embedImages: true,
    onlyVisible: false,
    includeCustomExtensions: true
  };

  exporter.parse(
    sceneOrGroup,
    (result) => {
      if (result instanceof ArrayBuffer) {
        const blob = new Blob([result], { type: 'model/gltf-binary' });
        downloadBlob(blob, filename);
      } else {
        const output = JSON.stringify(result, null, 2);
        const blob = new Blob([output], { type: 'application/json' });
        downloadBlob(blob, filename.replace('.glb', '.gltf'));
      }
    },
    (error) => {
      console.error('Error exporting GLTF:', error);
    },
    options
  );
}

// 2. Export 3D Scene to Wavefront OBJ format
export function exportToBlenderOBJ(sceneOrGroup, filename = 'tandem-paraglider.obj') {
  if (!sceneOrGroup) return;

  const exporter = new OBJExporter();
  const result = exporter.parse(sceneOrGroup);
  const blob = new Blob([result], { type: 'text/plain' });
  downloadBlob(blob, filename);
}
