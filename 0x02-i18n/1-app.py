#!/usr/bin/env python3
"""
Basic Flask app with Babel extension.
"""
from flask import Flask, render_template
from flask_babel import Babel

app = Flask(__name__)

# Instantiate Babel object and configure it
babel = Babel(app)


class Config:
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)


@app.route('/', methods=['GET'], strict_slashes=False)
def index():
    """
    hello world
    """
    return render_template('1-index.html')


if __name__ == '__main__':
    app.run(debug=True)
