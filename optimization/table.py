import numpy as np
import pandas as pd


class Table:
    def __init__(self, number_array: np.ndarray) -> None:
        assert number_array.shape == self.table_size()
        assert np.issubdtype(number_array.dtype, np.integer)
        assert number_array.min() >= 0
        assert number_array.max() <= max(self.numbers())

        self._number_array = number_array

    @classmethod
    def from_number_df(cls, number_df: pd.DataFrame) -> "Table":
        return cls(number_array=number_df.values)

    @classmethod
    def from_number_dict(cls, number_dict: dict[int, dict[int, int]]) -> "Table":
        number_df = pd.DataFrame(data=number_dict)
        return cls.from_number_df(number_df=number_df)

    @staticmethod
    def numbers() -> list[int]:
        return list(range(1, 10))

    @staticmethod
    def h_positions() -> list[int]:
        return list(range(1, 10))

    @staticmethod
    def v_positions() -> list[int]:
        return list(range(1, 10))

    @classmethod
    def table_size(cls) -> tuple[int, int]:
        return len(cls.v_positions()), len(cls.h_positions())

    @staticmethod
    def h_grid_positions() -> list[int]:
        return list(range(1, 4))

    @staticmethod
    def v_grid_positions() -> list[int]:
        return list(range(1, 4))

    @staticmethod
    def h_positions_in_grid() -> list[int]:
        return list(range(1, 4))

    @staticmethod
    def v_positions_in_grid() -> list[int]:
        return list(range(1, 4))

    @classmethod
    def grid_size(cls) -> tuple[int, int]:
        return len(cls.v_positions_in_grid()), len(cls.h_positions_in_grid())

    @property
    def number_df(self) -> pd.DataFrame:
        return pd.DataFrame(
            data=self._number_array,
            index=self.v_positions(),
            columns=self.h_positions(),
            dtype=int,
        )

    @property
    def number_dict(self) -> dict[int, dict[int, int]]:
        return pd.DataFrame(
            data=self._number_array,
            index=self.v_positions(),
            columns=self.h_positions(),
            dtype=int,
        ).to_dict()  # type: ignore

    def get_fixed_number(self, h_position: int, v_position: int) -> int | None:
        val = self.number_df.loc[v_position, h_position]
        if val == 0:
            return None
        else:
            return int(val)

    def convert_some_cells_to_zero(self, n_cells_to_zero: int, seed: int) -> None:
        np.random.seed(seed)
        idxes = np.arange(self._number_array.size)
        np.random.shuffle(idxes)
        target_idxes = idxes[:n_cells_to_zero]
        np.put(self._number_array, target_idxes, 0)
