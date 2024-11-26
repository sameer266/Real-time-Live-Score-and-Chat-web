# Change directory to the backend folder
cd .\backend\

# Activate the virtual environment
.\env\Scripts\Activate.ps1

# Change directory to the liveScore folder
cd .\liveScore\

# Start the Daphne server
daphne -p 8000 liveScore.asgi:application
