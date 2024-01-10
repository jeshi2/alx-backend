#!/usr/bin/env python3

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


if __name__ == "__main__":
    res = index_range(1, 7)
    print(type(res))
    print(res)

    res = index_range(page=3, page_size=15)
    print(type(res))
    print(res)
