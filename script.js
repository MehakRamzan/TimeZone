const timezoneBtn = document.getElementById('timezone-btn');
const timezoneModal = document.getElementById('timezone-modal');
const timezoneSelect = document.getElementById('timezone-select');
const timeDisplay = document.getElementById('time-display');

// Generate timezone options dynamically
const timezones = [
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Asia/Tokyo',
    // Add more timezones as needed
];

timezones.forEach((timezone) => {
    const option = document.createElement('option');
    option.value = timezone;
    option.text = timezone;
    timezoneSelect.appendChild(option);
});

// Initialize Micromodal
MicroModal.init();

// Open modal on button click
timezoneBtn.addEventListener('click', () => {
    MicroModal.show('timezone-modal');
});

// Close modal and update time on select change
timezoneSelect.addEventListener('change', () => {
    const selectedTimezone = timezoneSelect.value;
    updateTime(selectedTimezone);
    updateTimeEverySecond(selectedTimezone); // Start updating time every second
    MicroModal.close('timezone-modal');
});

// Update time display
function updateTime(timezone) {
    const date = new Date();
    
    const timeOptions = {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    const dateOptions = {
        timeZone: timezone,
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
    const formattedDate = date.toLocaleDateString('en-US', dateOptions);
    
    timeDisplay.innerHTML = `
        <div class="timezone">Current time in ${timezone}</div>
        <div class="time">${formattedTime}</div>
        <div class="date">${formattedDate}</div>
    `;
}

// Function to update time every second
function updateTimeEverySecond(timezone) {
    setInterval(() => {
        updateTime(timezone);
    }, 1000);
}

// Initialize time display with default timezone
updateTime('America/New_York');
