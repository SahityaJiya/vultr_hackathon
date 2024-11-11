document.addEventListener('DOMContentLoaded', function() {
    const dietForm = document.getElementById('diet-form');
    const dietPlanSection = document.getElementById('diet-plan');
    const dietPlanContent = document.getElementById('diet-plan-content');

    const recommendations = {
        medicines: [
            'Multivitamin', 'Omega-3 Fish Oil', 'Vitamin D', 'Probiotics',
            'Magnesium', 'Vitamin C', 'Zinc', 'Turmeric', 'Ginger Extract', 'Echinacea'
        ],
        fruits: [
            'Blueberries', 'Strawberries', 'Oranges', 'Apples', 'Pomegranate',
            'Kiwi', 'Pineapple', 'Grapefruit', 'Mango', 'Papaya'
        ],
        other: [
            'Regular exercise', 'Adequate sleep', 'Stress management techniques',
            'Proper hydration', 'Balanced meals', 'Portion control',
            'Limit processed foods', 'Increase fiber intake', 'Regular health check-ups',
            'Mindful eating practices'
        ]
    };

    function populateRecommendations() {
        populateList(recommendations.medicines, 'medicine-list');
        populateList(recommendations.fruits, 'fruit-list');
        populateList(recommendations.other, 'other-list');
    }

    function populateList(items, listId) {
        const list = document.getElementById(listId);
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            list.appendChild(li);
        });
    }

    function getDietPlan(ageGroup, healthProblem) {
        const plans = {
            child: {
                general: "Balanced diet with plenty of fruits, vegetables, and whole grains. Limit sugar and processed foods.",
                specific: {
                    obesity: "Focus on portion control and increasing physical activity. Include more fruits and vegetables.",
                    allergies: "Avoid known allergens. Consult with a pediatric allergist for a tailored diet plan."
                }
            },
            teen: {
                general: "High-energy foods, calcium-rich dairy, and lean proteins. Limit caffeine and sugary drinks.",
                specific: {
                    acne: "Reduce dairy and high-glycemic foods. Increase foods rich in zinc and omega-3 fatty acids.",
                    "eating disorders": "Balanced meals with professional guidance. Focus on nutrient-dense foods."
                }
            },
            adult: {
                general: "Balanced diet with lean proteins, whole grains, and a variety of fruits and vegetables. Moderate alcohol consumption.",
                specific: {
                    diabetes: "Low-glycemic foods, high fiber, and consistent meal timing. Monitor carbohydrate intake.",
                    hypertension: "Low-sodium diet. Increase potassium-rich foods like bananas and leafy greens."
                }
            },
            senior: {
                general: "Nutrient-dense foods, adequate hydration, and foods rich in B12, calcium, and vitamin D.",
                specific: {
                    "heart disease": "Low-fat, low-sodium diet. Increase omega-3 fatty acids and fiber intake.",
                    osteoporosis: "Calcium and vitamin D-rich foods. Include weight-bearing exercises in daily routine."
                }
            }
        };

        let plan = plans[ageGroup].general;
        const specificPlan = plans[ageGroup].specific[healthProblem.toLowerCase()];
        if (specificPlan) {
            plan += " " + specificPlan;
        } else {
            plan += " For your specific health concern, please consult with a healthcare professional for personalized advice.";
        }

        return plan;
    }

    dietForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const ageGroup = document.getElementById('age-group').value;
        const healthProblem = document.getElementById('health-problem').value;

        const dietPlan = getDietPlan(ageGroup, healthProblem);
        dietPlanContent.innerHTML = `<p>${dietPlan}</p>`;
        dietPlanSection.style.display = 'block';
    });

    populateRecommendations();
});