#!/usr/bin/env python3

import csv
from typing import List
from math import ceil

"""
simple pagination
"""


def index_range(page: int, page_size: int) -> tuple[int, int]:
    """
    Return a tuple of start and end indices for a given page and page_size.

    Returns:
        tuple: A tuple containing the start and end indices
        for the specified page.
    """
    start_index = (page - 1) * page_size
    end_index = page * page_size
    return start_index, end_index


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Return the specified page of the dataset based on
        pagination parameters.

        Returns:
            List[List]: A list of rows representing the
            specified page of the dataset.
        """
        assert isinstance(
            page, int) and page > 0, "Page be a positive integer"
        assert isinstance(
            page_size, int) and page_size > 0, "Page be a positive integer"

        start, end = index_range(page, page_size)
        dataset = self.dataset()

        if start >= len(dataset):
            return []

        return dataset[start:end]
