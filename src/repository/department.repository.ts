import { Repository } from "typeorm";
import Department from "../entity/department.entity";

class DepartmentRepository {
  constructor(private repository: Repository<Department>) {}
  public find = async (): Promise<Department[]> => {
    return this.repository.find({ relations: ["employees"] });
  };
  public findOneBy = async (
    filter: Partial<Department>
  ): Promise<Department> => {
    return this.repository.findOne({ where: filter, relations: ["employees"] });
  };
  public save = async (department: Department): Promise<Department> => {
    return this.repository.save(department);
  };
  public softRemove = async (department: Department): Promise<Department> => {
    return this.repository.softRemove(department);
  };
}

export default DepartmentRepository;
