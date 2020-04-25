Make sure youre in the BackEnd Directory
First to ensure the virtual environment is set up appropriately on the correct OS run:
```
python3 -m venv venv
```
Now you must enter the venv by typing the command:
```
source venv/bin/activate
```
If you want to leave the viruual environment type `deactivate`

Now you can install all the imports so run:
```
pip install -r requirements.txt 
```
When you install new imports and need to update the requirements.txt file you run:
```
pip freeze > requirements.txt
```
Be sure to be in the venv. If you aren't in the venv the pip freeze will install all
your imports on the machine, when you only want the ones installed in this repo.

To test the database locally you need to connect to the GCP instance. First make sure youre IP is added to Google SQL.
Then run the command in slack
