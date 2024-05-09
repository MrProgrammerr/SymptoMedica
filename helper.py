import pandas as pd
import pickle
import numpy as np
import ast

precautions = pd.read_csv("./Data/precautions_df.csv", index_col=0)
workout = pd.read_csv("./Data/workout_df.csv", index_col=0)
workout = workout[["disease","workout"]]
description = pd.read_csv("./Data/description.csv")
medications = pd.read_csv('./Data/medications.csv')
diets = pd.read_csv("./Data/diets.csv")
svc = pickle.load(open('svc.pkl','rb'))
diseases_dict = pickle.load(open("diseases_dict","rb"))
symptoms_dict = pickle.load(open("symptoms_dict","rb"))
def get_predicted_value(patient_symptoms):
    input_vector = np.zeros(len(symptoms_dict))
    for item in patient_symptoms:
        input_vector[symptoms_dict[item]] = 1
    prd_class = svc.predict([input_vector])[0]
    return diseases_dict[prd_class],prd_class
def get_details(dis):
    desc = description[description['Disease'] == dis]['Description']
    desc = " ".join([w for w in desc])

    pre = precautions[precautions['Disease'] == dis]['Precautions'].tolist()
    pre = pre[0]
    
    med = medications[medications['Disease'] == dis]['Medication'].tolist()
    med = ast.literal_eval(med[0])
    med = ",".join(med)
    
    die = diets[diets['Disease'] == dis]['Diet'].tolist()
    die = ast.literal_eval(die[0])
    die = ",".join(die)

    wrkout = ",".join((workout[workout['disease'] == dis] ['workout']).tolist())


    return desc,pre,med,die,wrkout