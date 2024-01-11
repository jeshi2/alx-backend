# 0x01 Caching

This project implements various caching algorithms in Python. The caching algorithms implemented include FIFO, LIFO, LRU, MRU, and LFU.

## Table of Contents

- [General](#general)
- [Project Structure](#project-structure)
- [Implementation](#implementation)
- [Usage](#usage)
- [Files](#files)
- [Requirements](#requirements)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## General

A caching system is a component that stores frequently accessed data in a way that allows for quick retrieval. Caching helps improve the performance of applications by reducing the time needed to fetch data from slower storage.

### Caching Algorithms

The implemented caching algorithms are as follows:

1. **BasicCache**: A simple caching system without any limit.
2. **FIFOCache**: Implements the First-In-First-Out (FIFO) caching algorithm.
3. **LIFOCache**: Implements the Last-In-First-Out (LIFO) caching algorithm.
4. **LRUCache**: Implements the Least Recently Used (LRU) caching algorithm.
5. **MRUCache**: Implements the Most Recently Used (MRU) caching algorithm.
6. **LFUCache**: Implements the Least Frequently Used (LFU) caching algorithm.

## Project Structure

The project structure is organized as follows:

- `base_caching.py`: Defines the base caching class with common methods and attributes.
- `0-basic_cache.py`: Implements the `BasicCache` class.
- `1-fifo_cache.py`: Implements the `FIFOCache` class.
- `2-lifo_cache.py`: Implements the `LIFOCache` class.
- `3-lru_cache.py`: Implements the `LRUCache` class.
- `4-mru_cache.py`: Implements the `MRUCache` class.
- `100-lfu_cache.py`: Implements the `LFUCache` class.
- `README.md`: This documentation file.

## Implementation

All caching classes inherit from the `BaseCaching` class, which provides common methods and attributes. Each specific caching class implements its respective caching algorithm.

## Usage

To use any of the caching classes, instantiate the class and use the `put` and `get` methods to add and retrieve items from the cache. Refer to the specific class implementations for more details.

## Files

- `base_caching.py`: Base caching class with common methods and attributes.
- `0-basic_cache.py`: Implementation of the `BasicCache` class.
- `1-fifo_cache.py`: Implementation of the `FIFOCache` class.
- `2-lifo_cache.py`: Implementation of the `LIFOCache` class.
- `3-lru_cache.py`: Implementation of the `LRUCache` class.
- `4-mru_cache.py`: Implementation of the `MRUCache` class.
- `100-lfu_cache.py`: Implementation of the `LFUCache` class.
- `README.md`: This documentation file.

## Requirements

- Python 3.7
- pycodestyle 2.5 (for code style compliance)

## Testing

Each caching class includes a test script (`0-main.py`, `1-main.py`, ..., `100-main.py`). Run the test scripts to verify the functionality of each caching algorithm.

## Contributing

Feel free to contribute by opening issues or submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
