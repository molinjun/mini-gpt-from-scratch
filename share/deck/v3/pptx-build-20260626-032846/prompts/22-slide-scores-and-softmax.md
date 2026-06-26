Scores and Softmax

The model compares Q and K to get attention scores. A higher score means a stronger match. Then softmax turns those scores into attention weights that add up to one. This is the first softmax in the story: it is inside attention, and it decides how much each visible token contributes.

