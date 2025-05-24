import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import api from '../../../axios';

const ImageEdit = () => {
  const userId = "682c9338ad956f255745289b";
  const categoryId = "682b3c4926ab9a01fee712b9";
  const originalImageUrl = "http://localhost:5000/uploads/images/originalImage-1747833984261.webp";
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [fabricLib, setFabricLib] = useState(null);
  const [title, setTitle] = useState('');
  const [paragraph, setParagraph] = useState('');

  useEffect(() => {
  let fabricInstance = null;

  const initCanvas = async () => {
    const fabricModule = await import('fabric');
    const fabric = fabricModule.default || fabricModule;

    setFabricLib(fabric);

    // Dispose existing canvas if already initialized
    if (canvasRef.current && fabric.Canvas) {
      if (fabric.Canvas.instances && fabric.Canvas.instances.length > 0) {
        fabric.Canvas.instances.forEach((instance) => {
          if (instance.wrapperEl?.contains(canvasRef.current)) {
            instance.dispose();
          }
        });
      }
    }

    const canvasInstance = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 500,
      backgroundColor: '#fff',
      preserveObjectStacking: true,
    });

    fabricInstance = canvasInstance;

    // Load background image
    fabric.Image.fromURL(originalImageUrl, (img) => {
      const scale = Math.min(800 / img.width, 500 / img.height);
      img.scale(scale);
      canvasInstance.setBackgroundImage(img, canvasInstance.renderAll.bind(canvasInstance), {
        scaleX: scale,
        scaleY: scale,
        originX: 'left',
        originY: 'top',
        top: 0,
        left: 0,
      });

      // Add frame (visual guide box over image)
      const frame = new fabric.Rect({
        top: 50,
        left: 50,
        width: 700,
        height: 400,
        stroke: '#4F46E5',
        strokeWidth: 2,
        fill: 'transparent',
        selectable: false,
        evented: false,
      });
      canvasInstance.add(frame);
      canvasInstance.sendToBack(frame);
    }, { crossOrigin: 'anonymous' });

    setCanvas(canvasInstance);
  };

  initCanvas();

  // Optional: Cleanup on unmount
  return () => {
    if (fabricInstance) {
      fabricInstance.dispose();
    }
  };
}, []);


  const addText = (text, top) => {
    if (!canvas || !fabricLib) return;

    const textbox = new fabricLib.Textbox(text, {
      top: top,
      left: 100,
      width: 600,
      fontSize: 24,
      fill: '#111827',
      fontWeight: 'bold',
      textAlign: 'center',
      editable: true,
    });

    canvas.add(textbox);
    canvas.setActiveObject(textbox);
    canvas.renderAll();
  };

  const handleExport = async () => {
    if (!canvas) return;

    const dataURL = canvas.toDataURL({ format: 'png' });
    const blob = await (await fetch(dataURL)).blob();

    const formData = new FormData();
    formData.append('image', blob, 'edited-image.png');
    formData.append('userId', userId);
    formData.append('categoryId', categoryId);
    formData.append('title', title);
    formData.append('paragraph', paragraph);

    try {
      await api.post('/api/edited-images/upload-edited', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Edited image saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save edited image.');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Edit Image</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-3 py-2 mr-2 rounded-md"
        />
        <button
          onClick={() => addText(title, 100)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Add Title
        </button>
      </div>

      <div className="mb-4">
        <textarea
          placeholder="Paragraph"
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
          className="border px-3 py-2 mr-2 rounded-md"
        />
        <button
          onClick={() => addText(paragraph, 160)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Add Paragraph
        </button>
      </div>

      <canvas id="editor-canvas" ref={canvasRef} className="border shadow-lg rounded" />

      <div className="mt-6">
        <button
          onClick={handleExport}
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-md font-semibold"
        >
          Save Edited Image
        </button>
      </div>
    </div>
  );
};

export default ImageEdit;
