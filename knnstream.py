import streamlit as st
import pandas as pd
import joblib

# Load the pre-trained model and associated data
loaded_model_data = joblib.load('linear_regression_model_all_columns.joblib')

# Extract the model and data
loaded_regression_model = loaded_model_data['model']
selected_features = loaded_model_data['selected_features']
output_columns = loaded_model_data['output_columns']
column_transformer = loaded_model_data['column_transformer']

# Streamlit app
def main():
    st.title('Calorie intake calculator')

    # Input form for user
    age = st.slider('Select Age', min_value=18, max_value=100, value=25)
    weight = st.slider('Select Weight (kg)', min_value=30, max_value=150, value=70)
    height = st.slider('Select Height (m)', min_value=1.0, max_value=2.5, value=1.75)
    gender = st.radio('Select Gender', ['M', 'F'])

    # Create DataFrame from user input
    user_input = {'age': age, 'weight(kg)': weight, 'height(m)': height, 'gender': gender}
    user_df = pd.DataFrame([user_input])

    # Apply one-hot encoding for 'gender'
    user_df_transformed = column_transformer.transform(user_df)

    # Make prediction
    user_predictions = loaded_regression_model.predict(user_df_transformed)

    # Display predicted values for each output column
    st.subheader('Predicted Values:')
    for output_column, predicted_value in zip(output_columns, user_predictions[0]):
        st.write(f"{output_column}: {predicted_value}")

if __name__ == '__main__':
    main()
