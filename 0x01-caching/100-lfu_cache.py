#!/usr/bin/env python3
""" LFUCache module
"""
from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """ LFUCache class inherits from BaseCaching
    """

    def __init__(self):
        """ Initialize LFUCache
        """
        super().__init__()
        self.freq_count = {}

    def put(self, key, item):
        """ Add an item in the cache using LFU algorithm
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= self.MAX_ITEMS:
                # Find the least frequency used key(s)
                min_freq_keys = [
                    k for k, v in self.freq_count.items() if v == min(
                        self.freq_count.values())]

                # If there's more than one key, use LRU algorithm to break the
                # tie
                if len(min_freq_keys) > 1:
                    discarded_key = min(
                        min_freq_keys,
                        key=lambda k: self.cache_data[k]
                        if k in self.cache_data else "")
                else:
                    discarded_key = min_freq_keys[0]

                del self.cache_data[discarded_key]
                del self.freq_count[discarded_key]
                print("DISCARD:", discarded_key)

            self.cache_data[key] = item
            # Increment the frequency count of the key
            self.freq_count[key] = self.freq_count.get(key, 0) + 1

    def get(self, key):
        """ Get an item by key using LFU algorithm
        """
        if key is not None and key in self.cache_data:
            # Increment the frequency count of the key
            self.freq_count[key] = self.freq_count.get(key, 0) + 1
            return self.cache_data[key]
        return None
