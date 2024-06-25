from ortools.sat.python import cp_model

from .table import Table
from .variables import Variables
from .constraints import add_constraints
from .solution_callback import SolutionCallback


class Optimizer:
    @classmethod
    def run(cls, table: Table, seed: int = 123) -> Table | None:
        model = cp_model.CpModel()

        variables = Variables(model=model)

        add_constraints(model=model, table=table, variables=variables)

        solver = cp_model.CpSolver()
        solver.parameters.random_seed = seed
        solver.parameters.enumerate_all_solutions = False
        solver.parameters.linearization_level = 0
        solution_callback = SolutionCallback(table=table, variables=variables)
        status = solver.solve(model=model, solution_callback=solution_callback)

        has_solution = status == cp_model.OPTIMAL or status == cp_model.FEASIBLE
        # cls._print_statistics(solver=solver)

        if not has_solution:
            return None
        return solution_callback.result_table

    # @staticmethod
    # def _print_statistics(solver: cp_model.CpSolver) -> None:
    #     print("\n-------- WallTime --------")
    #     print(f"{solver.wall_time:1f} s")
