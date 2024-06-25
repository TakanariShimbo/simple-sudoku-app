import numpy as np
from ortools.sat.python import cp_model

from .table import Table
from .variables import Variables


class SolutionCallback(cp_model.CpSolverSolutionCallback):
    def __init__(self, table: Table, variables: Variables):
        super().__init__()

        self._table = table
        self._variables = variables
        self._result_table: Table | None = None

    def _get_assigned_number(self, h_position: int, v_position: int) -> int:
        for number in Table.numbers():
            is_assigned_var = self._variables.get_is_assigned_var(h_position=h_position, v_position=v_position, number=number)
            is_assigned = self.value(is_assigned_var)
            if is_assigned:
                return number
        raise Exception(f"Zero Assigned Number at {h_position} {v_position}")

    def _save_result(self) -> None:
        result_number_array = np.zeros(Table.table_size(), dtype=int)
        for h_idx, h_position in enumerate(Table.h_positions()):
            for v_idx, v_position in enumerate(Table.v_positions()):
                number = self._get_assigned_number(h_position=h_position, v_position=v_position)
                result_number_array[v_idx, h_idx] = number

        self._result_table = Table(number_array=result_number_array)

    def on_solution_callback(self) -> None:
        self._save_result()

    @property
    def result_table(self) -> Table | None:
        return self._result_table
