// Tab switching function
function showTab(tabName) {
    console.log('Switching to tab:', tabName);
    
    // Hide all tabs
    document.querySelectorAll('.content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Clock functionality
function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    document.getElementById('currentTime').textContent = time;
    document.getElementById('currentDate').textContent = date;
}

// Update clock every second
setInterval(updateClock, 1000);

// Stopwatch functionality
let stopwatchRunning = false;
let stopwatchTime = 0;
let stopwatchInterval;
let lapCount = 0;

function startStopwatch() {
    console.log('Stopwatch started');
    if (!stopwatchRunning) {
        stopwatchRunning = true;
        const startTime = Date.now() - stopwatchTime;
        
        stopwatchInterval = setInterval(() => {
            stopwatchTime = Date.now() - startTime;
            updateStopwatchDisplay();
        }, 10);
    } else {
        stopStopwatch();
    }
}

function stopStopwatch() {
    console.log('Stopwatch stopped');
    stopwatchRunning = false;
    clearInterval(stopwatchInterval);
}

function resetStopwatch() {
    console.log('Stopwatch reset');
    stopwatchRunning = false;
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    lapCount = 0;
    updateStopwatchDisplay();
    document.getElementById('lapsContainer').innerHTML = '';
}

function recordLap() {
    console.log('Lap recorded');
    if (stopwatchRunning) {
        lapCount++;
        const lapTime = formatTime(stopwatchTime);
        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        lapItem.innerHTML = `<span>Lap ${lapCount}</span><span>${lapTime}</span>`;
        document.getElementById('lapsContainer').appendChild(lapItem);
    }
}

function updateStopwatchDisplay() {
    document.getElementById('stopwatchDisplay').textContent = formatTime(stopwatchTime);
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
}

// Timer functionality
let timerRunning = false;
let timerTime = 0;
let timerInterval;

function startTimer() {
    console.log('Timer started');
    if (!timerRunning) {
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;
        timerTime = (minutes * 60 + seconds) * 1000;
        
        if (timerTime <= 0) {
            alert('Please set a valid time!');
            return;
        }
        
        timerRunning = true;
        const startTime = Date.now();
        
        timerInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = timerTime - elapsed;
            
            if (remaining <= 0) {
                timerComplete();
            } else {
                updateTimerDisplay(remaining);
            }
        }, 100);
        
        document.getElementById('timerStatus').textContent = 'Timer running...';
    } else {
        stopTimer();
    }
}

function stopTimer() {
    console.log('Timer stopped');
    timerRunning = false;
    clearInterval(timerInterval);
    document.getElementById('timerStatus').textContent = 'Timer paused';
}

function resetTimer() {
    console.log('Timer reset');
    timerRunning = false;
    clearInterval(timerInterval);
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    timerTime = (minutes * 60 + seconds) * 1000;
    updateTimerDisplay(timerTime);
    document.getElementById('timerStatus').textContent = 'Ready to start!';
}

function timerComplete() {
    console.log('Timer completed');
    timerRunning = false;
    clearInterval(timerInterval);
    updateTimerDisplay(0);
    document.getElementById('timerStatus').textContent = 'Time\'s up! 🎉';
    beep();
}

function updateTimerDisplay(milliseconds) {
    const totalSeconds = Math.ceil(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    document.getElementById('timerDisplay').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function beep() {
    console.log('Playing beep sound');
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
    } catch (e) {
        console.log('Audio not supported');
    }
}

// Initialize everything when page loads
window.onload = function() {
    console.log('Page loaded - initializing app');
    updateClock();
    updateStopwatchDisplay();
    updateTimerDisplay(25 * 60 * 1000);
    console.log('App initialized successfully!');
};