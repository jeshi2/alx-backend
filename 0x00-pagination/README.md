# 0x00 Pagination

This project is focused on implementing pagination features for a dataset of popular baby names using a server class. The goal is to design a resilient and hypermedia-driven pagination system.

## Task 1: Pagination with Simple Parameters

The task involves creating a Python script that implements pagination for a dataset using simple `page` and `page_size` parameters. The script adheres to coding standards, uses the `pycodestyle` style, and includes proper documentation.

### Files:
- `0-simple_helper_function.py`: Implementation of the pagination function.
- `0-main.py`: Test script for the pagination function.

## Task 2: Hypermedia-Driven Pagination

This task extends the pagination system to include hypermedia metadata (HATEOAS). A Python script is created to implement pagination with hypermedia links, allowing for a more dynamic and interactive experience.

### Files:
- `1-simple_pagination.py`: Extension of the pagination script with HATEOAS.
- `1-main.py`: Test script for the hypermedia-driven pagination.

## Task 3: Deletion-Resilient Hypermedia Pagination

In this task, the project focuses on ensuring resilience against deletions in the dataset while implementing hypermedia pagination. A method is added to the server class to handle deletion-resilient pagination.

### Files:
- `2-hypermedia_del_pagination.py`: Implementation of deletion-resilient hypermedia pagination.
- `2-main.py`: Test script for the deletion-resilient hypermedia pagination.

## Task 4: Hypermedia Pagination by Index

The final task introduces pagination based on sorting position index. A method is implemented to return hypermedia pagination information using the index as a reference.

### Files:
- `3-hypermedia_del_pagination.py`: Extension of the server class with index-based hypermedia pagination.
- `3-main.py`: Test script for the index-based hypermedia pagination.

## Running the Tests

To test each task, run the corresponding test script. For example:

```bash
./0-main.py
./1-main.py
./2-main.py
./3-main.py
