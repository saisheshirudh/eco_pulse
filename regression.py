import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
import joblib

# Load your dataset
your_dataset_path = 'Dataset.csv'
df = pd.read_csv(your_dataset_path)

# Select relevant columns
selected_features = ['age', 'weight(kg)', 'height(m)', 'gender']
output_columns = ['BMI', 'BMR', 'activity_level', 'calories_to_maintain_weight', 'BMI_tags', 'Label']

# Extract features and labels
X = df[selected_features]
y = df[output_columns]

# Handle categorical variable 'gender' with one-hot encoding
column_transformer = ColumnTransformer(
    transformers=[('encoder', OneHotEncoder(), ['gender'])],
    remainder='passthrough'
)

X = column_transformer.fit_transform(X)

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a linear regression model
regression_model = LinearRegression()
regression_model.fit(X_train, y_train)

# Save the trained model along with the training data and labels
model_data = {
    'model': regression_model,
    'selected_features': selected_features,
    'output_columns': output_columns,
    'column_transformer': column_transformer
}

joblib.dump(model_data, 'linear_regression_model_all_columns.joblib')

print("Linear regression model trained and saved successfully.")
