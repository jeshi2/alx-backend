#!/usr/bin/env python3
"""
simpe helper function
"""


def index_range(page: int, page_size: int) -> tuple[int, int]:
    """
    Return a tuple of start and end indices for a given page and page_size.

    Returns:
        tuple: A tuple containing the start and
        end indices for the specified page.
    """
    start_index = (page - 1) * page_size
    end_index = page * page_size
    return start_index, end_index
