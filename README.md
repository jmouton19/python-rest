# Computer Science 334 - Project 1 - Group 8

Workspace for website with a Flask backend and React frontend deployed on Heroku.

Heroku deployed website (please note that we are using a free tier of Heroku; loading might take a while):
https://cs334proj1group8.herokuapp.com/

Video Demonstration Link:
https://youtu.be/x9kkwsDrRyw

## Getting Started

### Back End

In the root directory...

Create a virtual environment, called `venv`.

```
python -m venv venv/
```

Activate the environment.

```
source venv/bin/activate
```

Install the python libraries from the `requirements.txt` file.

```
pip install -r requirements.txt
```

Change directory to `server/`.

```
cd server
```

Run the flask server.

```
flask run
```

Go to http://127.0.0.1:5000/ in your browser.

### Front End

Change directory to `client/`.

Install node dependencies.

```
npm install
```

Start the development server.

```
npm start
```

### Notes

- If running the **front end from Node**, the Flask server must be active.
- If running the **back end from Flask**, the <u>most recent build</u> of the front end will be used.
  - To build a new version of the front end run the build script with `npm run build`.

### Setting Up ESLint

- Navigate to Visual Studio Code and search for ESLint in the **Extensions** tab. Click **Install** once you have located the extension.
- Check if it works by opening a .js file, making some weird format changes and hitting save.

## Deploying to Heroku

1. Save all your changes.
2. Test your changes!
3. **Run the build script** with `npm run build` from the `client/` directory.
4. Commit your changes to git `origin` (gitlab) in whatever way you prefer.
5. Push to git `remote` (heroku) with :

```
git push heroku master
```
