from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
	return render_template('units_terran.html')

@app.route('/zerg')
def zerg():
	return render_template('units_zerg.html')

if __name__ == '__main__':
	app.run(debug=True)