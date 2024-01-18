#!/usr/bin/env python3
"""
Flask app with Babel extension, user login emulation, and timezone support.
"""
from flask import Flask, render_template, request, g
from flask_babel import Babel, _, format_datetime
import pytz
from datetime import datetime

app = Flask(__name__)

babel = Babel(app)


class Config:
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)

users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


@babel.localeselector
def get_locale():
    requested_locale = request.args.get('locale')
    if requested_locale and requested_locale in app.config['LANGUAGES']:
        return requested_locale

    if g.user and g.user['locale'] and g.user['locale']
    in app.config['LANGUAGES']:
        return g.user['locale']

    return request.accept_languages.best_match(app.config['LANGUAGES'])
    or app.config['BABEL_DEFAULT_LOCALE']


@babel.timezoneselector
def get_timezone():
    requested_timezone = request.args.get('timezone')
    if requested_timezone:
        try:
            pytz.timezone(requested_timezone)
            return requested_timezone
        except pytz.exceptions.UnknownTimeZoneError:
            pass

    if g.user and g.user['timezone']:
        try:
            pytz.timezone(g.user['timezone'])
            return g.user['timezone']
        except pytz.exceptions.UnknownTimeZoneError:
            pass

    return app.config['BABEL_DEFAULT_TIMEZONE']


@app.before_request
def before_request():
    user_id = request.args.get('login_as')
    g.user = get_user(int(user_id)) if user_id else None


def format_current_time():
    if g.user and g.user['timezone']:
        user_timezone = pytz.timezone(g.user['timezone'])
        current_time = datetime.now(user_timezone)
    else:
        user_timezone = pytz.timezone(app.config['BABEL_DEFAULT_TIMEZONE'])
        current_time = datetime.now(user_timezone)

    return format_datetime(current_time, "medium")


@app.route('/', methods=['GET'], strict_slashes=False)
def index():
    return render_template('index.html', current_time=format_current_time())


if __name__ == '__main__':
    app.run(debug=True)
