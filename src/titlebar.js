window.onbeforeunload = (event) => {
    /* If window is reloaded, remove win event listeners
      (DOM element listeners get auto garbage collected but not
       Electron win listeners as the win is not dereferenced unless closed) */
       window.removeAllListeners();
}

function handleWindowControls() {
        // Make minimise/maximise/restore/close buttons work when they are clicked
        document.getElementById('min-button').addEventListener("click", event => {
            window.minimize();
        });

        document.getElementById('max-button').addEventListener("click", event => {
            window.maximize();
        });

        document.getElementById('restore-button').addEventListener("click", event => {
            window.unmaximize();
        });

        document.getElementById('close-button').addEventListener("click", event => {
            window.close();
        });

        // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
        toggleMaxRestoreButtons();

        window.on('maximize', toggleMaxRestoreButtons);
        window.on('unmaximize', toggleMaxRestoreButtons);

    function toggleMaxRestoreButtons() {
            if (window.isMaximized()) {
                document.body.classList.add('maximized');
            } else {
                document.body.classList.remove('maximized');
            }
    }
}