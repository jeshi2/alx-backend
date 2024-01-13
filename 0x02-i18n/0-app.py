#!/usr/bin/env python3
"""
Basic Flask app with a single / route.
"""
from flask import Flask, render_template

app = Flask(__name__)


@app.route('/', methods=['GET'], strict_slashes=False)
def index():
    return render_template(
        '0-index.html',
        title='Welcome to Holberton',
        header='Hello world')
