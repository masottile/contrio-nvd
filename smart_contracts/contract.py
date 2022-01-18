
class contract():
    def __init__():
        pass

    # does not permit new attributes to be added, but does alow for modification of existing attributes
    # def __setattr__(cls, attr, value):
    #         if attr not in cls.attr:
    #             raise AttributeError ("Cannot assign attributes to this class")
    #         return type.__setattr__(cls, attr, value)

    # does not permit attribute modification or addition EXCEPT in the constructor function
    # requires: import inspect
    # def __setattr__(self, *args):
    #     if inspect.stack()[1][3] == '__init__':
    #         object.__setattr__(self, *args)
    #     else:
    #         raise TypeError('Cannot modify immutable instance')

    # to prevent attribute deletion, overwrite the __delattr__ method