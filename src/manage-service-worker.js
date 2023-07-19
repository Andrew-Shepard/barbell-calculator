export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/barbell-calculator/service-worker.js')
          .then((registration) => {
            console.log('ServiceWorker registration successful:', registration);
          })
          .catch((error) => {
            console.log('ServiceWorker registration failed:', error);
          });
      });
    }
  }
  
  export function unregisterServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.unregister()
            .then(() => {
              console.log('ServiceWorker unregistration successful');
            })
            .catch((error) => {
              console.log('ServiceWorker unregistration failed:', error);
            });
        })
        .catch((error) => {
          console.log('ServiceWorker registration not found:', error);
        });
    }
  }
  