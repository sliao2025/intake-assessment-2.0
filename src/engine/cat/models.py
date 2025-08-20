import numpy as np

def sigmoid(x):
    return 1.0 / (1.0 + np.exp(-x))

def p_2pl(theta, a, b):
    # Probability of endorsing higher category for dichotomous simplification
    return sigmoid(a * (theta - b))

def info_2pl(theta, a, b):
    p = p_2pl(theta, a, b)
    q = 1 - p
    return (a ** 2) * p * q