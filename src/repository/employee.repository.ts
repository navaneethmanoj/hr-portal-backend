import { Repository, UpdateResult } from "typeorm";
import Employee from "../entity/employee.entity";

class EmployeeRepository {
  constructor(private repository: Repository<Employee>) {}
  public find = async (): Promise<Employee[]> => {
    return this.repository.find({ relations: ["address", "department"] });
  };
  public findOneBy = async (filter: Partial<Employee>): Promise<Employee> => {
    return this.repository.findOne({
      where: filter,
      relations: ["address", "department"],
    });
  };
  public save = async (employee: Employee): Promise<Employee> => {
    return this.repository.save(employee);
  };
  public delete = async (id: number): Promise<UpdateResult> => {
    return this.repository.softDelete(id);
  };
  public softRemove = async (employee: Employee) => {
    return this.repository.softRemove(employee);
  };
}

export default EmployeeRepository;
