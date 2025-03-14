document.addEventListener('DOMContentLoaded', function() {
    const lightBtn = document.getElementById('light-btn');
    const dayNightBtn = document.getElementById('day-night-btn');
    const clapBtn = document.getElementById('clap-btn');
    const light = document.querySelector('.light');
    const switchToggle = document.querySelector('.switch-toggle');
    const dayNightCycle = document.querySelector('.day-night-cycle');
    const lightSwitch = document.querySelector('.light-switch');
    const room = document.querySelector('.room');
    const windowElement = document.querySelector('.window');

    let isLightOn = true;
    let isDay = true;

    function toggleLight() {
        isLightOn = !isLightOn;
        
        if (isLightOn) {
            light.classList.remove('off');
            switchToggle.classList.remove('off');
        } else {
            light.classList.add('off');
            switchToggle.classList.add('off');
        }
    }

    function toggleDayNight() {
        isDay = !isDay;
        
        if (isDay) {
            dayNightCycle.classList.remove('night');
            windowElement.style.backgroundColor = '#3498db';
        } else {
            dayNightCycle.classList.add('night');
            windowElement.style.backgroundColor = '#2c3e50';
        }
    }

    function clap() {
        clapBtn.classList.add('active');
        
        const clapEffect = document.createElement('div');
        clapEffect.classList.add('clap-effect');
        clapEffect.style.left = `${Math.random() * 80 + 10}%`;
        clapEffect.style.top = `${Math.random() * 80 + 10}%`;
        room.appendChild(clapEffect);
        
        setTimeout(() => {
            if (clapEffect.parentNode) {
                clapEffect.parentNode.removeChild(clapEffect);
            }
        }, 500);
        
        setTimeout(() => {
            clapBtn.classList.remove('active');
        }, 500);
        
        toggleLight();
        
        playSound();
    }
    
    function playSound() {
        
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.type = 'triangle';
            oscillator.frequency.value = 150;
            gainNode.gain.value = 0.1;
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.start();
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            setTimeout(() => {
                oscillator.stop();
            }, 150);
        } catch (e) {
            console.log("El navegador no soporta Web Audio API");
        }
    }

    lightBtn.addEventListener('click', toggleLight);
    dayNightBtn.addEventListener('click', toggleDayNight);
    lightSwitch.addEventListener('click', toggleLight);
    clapBtn.addEventListener('click', clap);
    
    setInterval(() => {
        if (isLightOn) {
            const randomSize = Math.random() * 10 + 35;
            light.style.boxShadow = `0 0 ${randomSize}px ${randomSize/2}px #f39c12`;
        }
    }, 1000);
});