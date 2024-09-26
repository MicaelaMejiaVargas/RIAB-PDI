        // Configura Cloudinary
        const cloudinaryConfig = {
          cloud_name: '	micaela',
          api_key: '887454193968267',
          api_secret: 'K_T4JeOuFWclyGrn-9E2vwvpaPg'
      };

      document.getElementById('uploadButton').addEventListener('click', async () => {
          const fileInput = document.getElementById('fileInput');
          const file = fileInput.files[0];

          if (file) {
              // Crea un FormData para la subida
              const formData = new FormData();
              formData.append('file', file);
              formData.append('upload_preset', 'riaBonaerense'); // Asegúrate de tener un preset de carga

              try {
                  // Realiza la subida a Cloudinary
                  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/image/upload`, {
                      method: 'POST',
                      body: formData
                  });
                  const result = await response.json();

                  // Muestra la imagen subida
                  const img = document.getElementById('uploadedImage');
                  img.src = result.secure_url; // URL de la imagen subida
                  img.style.display = 'block';
              } catch (error) {
                  console.error('Error subiendo la imagen:', error);
              }
          } else {
              alert('Por favor selecciona una imagen');
          }
      });