const symptoms = ['itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 'joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 'burning_micturition', 'spotting_ urination', 'fatigue', 'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy', 'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes', 'breathlessness', 'sweating', 'dehydration', 'indigestion', 'headache', 'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'foul_smell_of urine', 'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)', 'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain', 'abnormal_menstruation', 'dischromic _patches', 'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption', 'fluid_overload.1', 'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze'];

const symptomContainer = document.getElementById('symptomContainer');

// Create checkboxes for each symptom
symptoms.forEach(symptom => {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'symptom';
  checkbox.value = symptom;

  const label = document.createElement('label');
  label.textContent = symptom;
  label.appendChild(checkbox);

  symptomContainer.appendChild(label);
});
filterSymptoms()

function filterSymptoms() {
  const searchBox = document.getElementById('searchBox');
  const filter = searchBox.value.toLowerCase();
  const labels = symptomContainer.querySelectorAll('label');

  labels.forEach(label => {
    const text = label.textContent.toLowerCase();
    if (text.includes(filter)) {
      label.style.display = 'block';
    } else {
      label.style.display = 'none';
    }
  });
}

function submitForm() {
  const selectedSymptoms = [];
  const checkboxes = document.querySelectorAll('input[name="symptom"]:checked');
  checkboxes.forEach(checkbox => {
    selectedSymptoms.push(checkbox.value);
  });
  
  // Call the API with selected symptoms
  callAPI(selectedSymptoms);
}

function displayResponse(data) {
  // Clear previous response
  const responseContainer = document.getElementById('responseContainer');
  responseContainer.innerHTML = '';

  // Create elements to display response
  const diseaseHeading = document.createElement('h2');
  diseaseHeading.textContent = 'Disease';
  const diseaseParagraph = document.createElement('p');
  diseaseParagraph.textContent = data.disease;

  const descHeading = document.createElement('h2');
  descHeading.textContent = 'Description';
  const descParagraph = document.createElement('p');
  descParagraph.textContent = data.desc;

  const medHeading = document.createElement('h2');
  medHeading.textContent = 'Medication';
  const medParagraph = document.createElement('p');
  medParagraph.textContent = data.med;

  const dietHeading = document.createElement('h2');
  dietHeading.textContent = 'Diet';
  const dietParagraph = document.createElement('p');
  dietParagraph.textContent = data.diet;

  const preventionHeading = document.createElement('h2');
  preventionHeading.textContent = 'Prevention Tips';
  const preventionParagraph = document.createElement('p');
  preventionParagraph.textContent = data.pre;

  const workoutHeading = document.createElement('h2');
  workoutHeading.textContent = 'Workout Recommendations';
  const workoutParagraph = document.createElement('p');
  workoutParagraph.textContent = data.wrkout;

  // Append elements to container
  responseContainer.appendChild(diseaseHeading);
  responseContainer.appendChild(diseaseParagraph);
  responseContainer.appendChild(descHeading);
  responseContainer.appendChild(descParagraph);
  responseContainer.appendChild(medHeading);
  responseContainer.appendChild(medParagraph);
  responseContainer.appendChild(dietHeading);
  responseContainer.appendChild(dietParagraph);
  responseContainer.appendChild(preventionHeading);
  responseContainer.appendChild(preventionParagraph);
  responseContainer.appendChild(workoutHeading);
  responseContainer.appendChild(workoutParagraph);
}


function clearForm() {
  // Uncheck all checkboxes
  const checkboxes = document.querySelectorAll('input[name="symptom"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });

  // Reset search input
  document.getElementById('searchBox').value = '';

  // Refilter symptoms
  filterSymptoms();
  // Clear previous response
  const responseContainer = document.getElementById('responseContainer');
  responseContainer.innerHTML = '';
}


function callAPI(inputData) {
  fetch('http://localhost:5000/process', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Display response
      displayResponse(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}
