import numpy as np

from optimization import Optimizer, Table


init_number_array = np.array(
    [
        [0, 8, 0, 4, 0, 0, 0, 9, 0],
        [0, 6, 0, 0, 0, 0, 1, 3, 0],
        [0, 0, 1, 7, 0, 0, 0, 0, 0],
        [0, 0, 6, 0, 0, 0, 5, 0, 0],
        [7, 0, 5, 0, 9, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 8, 0, 0, 3],
        [5, 2, 0, 3, 0, 0, 0, 7, 6],
        [0, 7, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 4, 0, 0, 0, 0],
    ],
    dtype=int,
)
init_table = Table(number_array=init_number_array)
result_table = Optimizer.run(table=init_table, seed=123)


print("\n-------- Probrem --------")
print(init_table.number_df)

print("\n-------- Solution --------")
if result_table:
    print(result_table.number_df)
else:
    print("Not found")

print()
