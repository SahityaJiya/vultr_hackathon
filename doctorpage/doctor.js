document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');

    // Mock data for doctors (in a real application, this would come from a backend API)
    const doctors = [
        { name: "Dr. John Smith", specialty: "Cardiology", availability: "Mon, Wed, Fri" },
        { name: "Dr. Sarah Johnson", specialty: "Dermatology", availability: "Tue, Thu, Sat" },
        { name: "Dr. Michael Lee", specialty: "Orthopedics", availability: "Mon, Tue, Thu" },
        { name: "Dr. Emily Brown", specialty: "Pediatrics", availability: "Wed, Fri, Sat" },
        { name: "Dr. David Wilson", specialty: "Neurology", availability: "Mon, Wed, Fri" }
    ];

    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredDoctors = doctors.filter(doctor => 
            doctor.name.toLowerCase().includes(searchTerm) || 
            doctor.specialty.toLowerCase().includes(searchTerm)
        );

        displaySearchResults(filteredDoctors);
    });

    function displaySearchResults(results) {
        searchResults.innerHTML = '';

        if (results.length === 0) {
            searchResults.innerHTML = '<p>No doctors found. Please try a different search term.</p>';
            return;
        }

        results.forEach(doctor => {
            const doctorCard = document.createElement('div');
            doctorCard.classList.add('doctor-card');
            doctorCard.innerHTML = `
                <h3>${doctor.name}</h3>
                <p>Specialty: ${doctor.specialty}</p>
                <p>Availability: ${doctor.availability}</p>
                <div class="doctor-actions">
                    <button onclick="scheduleAppointment('${doctor.name}')">Schedule Appointment</button>
                    <button onclick="startVideoCall('${doctor.name}')">Video Call</button>
                    <button onclick="startPhoneCall('${doctor.name}')">Phone Call</button>
                </div>
            `;
            searchResults.appendChild(doctorCard);
        });
    }
});

// These functions would be implemented to handle the respective actions
function scheduleAppointment(doctorName) {
    alert(`Scheduling appointment with ${doctorName}`);
}

function startVideoCall(doctorName) {
    alert(`Starting video call with ${doctorName}`);
}

function startPhoneCall(doctorName) {
    alert(`Starting phone call with ${doctorName}`);
}