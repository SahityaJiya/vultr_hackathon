// Toggle between forms: login, signup, and forgot password
function toggleForm(formId) {
    const forms = ["loginForm", "signUpForm", "forgotPasswordForm"];
    forms.forEach((id) => {
        document.getElementById(id).style.display = id === formId ? "flex" : "none";
    });
}

// Adding animations and effects for a more engaging user experience
const leaves = document.querySelectorAll(".leaves .set div");
leaves.forEach((leaf) => {
    leaf.style.animationDelay = `${Math.random() * 10}s`;
});

document.addEventListener("mousemove", (e) => {
    const bg = document.querySelector(".bg");
    const trees = document.querySelector(".trees");
    const girl = document.querySelector(".girl");

    const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
    const yPos = (e.clientY / window.innerHeight - 0.5) * 20;

    bg.style.transform = `translate(${xPos * 0.5}px, ${yPos * 0.5}px)`;
    trees.style.transform = `translate(${xPos * 0.8}px, ${yPos * 0.8}px)`;
    girl.style.transform = `scale(0.65) translate(${xPos}px, ${yPos}px)`;
});

const btn = document.getElementById("btn");
btn.addEventListener("mouseover", () => {
    btn.style.transform = "scale(1.05)";
});
btn.addEventListener("mouseleave", () => {
    btn.style.transform = "scale(1)";
});

window.addEventListener("load", () => {
    leaves.forEach((leaf) => {
        const rotate = Math.random() * 360;
        leaf.style.transform = `rotate(${rotate}deg)`;
    });
});
function sendResetLink() {
    const email = document.getElementById("resetEmail").value;
    const resetMessage = document.getElementById("resetMessage");

    if (email) {
        fetch("/send-reset-link", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                resetMessage.style.display = "block";
            } else {
                alert(data.message || "Something went wrong. Please try again.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    } else {
        alert("Please enter a valid email address.");
    }
}
