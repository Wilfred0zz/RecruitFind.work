# Developer Steps To Run The BackEnd :computer:

Make sure you're in the BackEnd Directory
To ensure the virtual environment is set up appropriately on the correct OS run:
```
python3 -m venv venv
```
Now you must activate the venv. If you are using a UNIX-based OS, type this command:
```
source venv/bin/activate
```
If on Windows, type this command:
```
venv\Scripts\activate
```
If you want to leave the virtual environment type `deactivate`

Now you can install all the imports so run:
```
pip install -r requirements.txt 
```
When you install new imports and need to update the requirements.txt file you run:
```
pip freeze > requirements.txt
```
Be sure to be in the venv. If you aren't in the venv the pip freeze will install all
the python packages you have ever installed on the machine, when you only want the ones installed for this project.

To test the database locally you need to connect to the GCP instance. First make sure youre IP is added to Google SQL.
Then run the command in slack
