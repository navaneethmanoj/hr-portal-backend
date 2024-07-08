import { when } from "jest-when";
import Department from "../../src/entity/department.entity";
import DepartmentRepository from "../../src/repository/department.repository";
import DepartmentService from "../../src/service/department.service";
import { Role } from "../../src/utils/role.enum";
import Address from "../../src/entity/address.entity";

describe("Department Service", () => {
  let departmentRepository: DepartmentRepository;
  let departmentService: DepartmentService;
  beforeAll(() => {
    const dataSource = {
      getRepository: jest.fn(),
    };
    departmentRepository = new DepartmentRepository(
      dataSource.getRepository(Department)
    );
    departmentService = new DepartmentService(departmentRepository);
  });
  it("should return all departments", async () => {
    const mockfn = jest.fn(departmentRepository.find).mockResolvedValue([]);
    departmentRepository.find = mockfn;

    const users = await departmentRepository.find();

    expect(users).toEqual([]);
    expect(mockfn).toHaveBeenCalledTimes(1);
  });
  it("should return a department", async () => {
    const department = {
      id: 1,
      name: "Admin",
    };
    const department2 = {
      id: 2,
      name: "HR",
    };
    const mockfn = jest.fn();
    when(mockfn)
      .calledWith({ id: 1 })
      .mockResolvedValue(department as Department)
      .calledWith({ id: 2 })
      .mockResolvedValue(department2 as Department);
    departmentRepository.findOneBy = mockfn;

    const user1 = await departmentService.getDepartmentById(1);
    const user2 = await departmentService.getDepartmentById(2);
    if (!user1 || !user2) return;
    expect(user1.name).toEqual("Admin");
    expect(user2.name).toEqual("HR");
    expect(mockfn).toHaveBeenCalledTimes(2);
  });
  it("should return the created department", async () => {
    const department = {
      id: 4,
      name: "Finance",
    };
    const mockfn = jest
      .fn(departmentRepository.save)
      .mockResolvedValue(department as Department);
    departmentRepository.save = mockfn;
    const createdDept = await departmentService.createDepartment(
      department.name
    );
    if (!createdDept) return;
    expect(createdDept.name).toEqual("Finance");
  });
  it("should return the updated department name", async () => {
    const department = {
      id: 4,
      name: "HR",
    };
    const newDepartment = {
      id: 4,
      name: "Human Resources",
    };
    const mockfn = jest
      .fn(departmentRepository.findOneBy)
      .mockResolvedValue(department as Department);
    departmentRepository.findOneBy = mockfn;
    const mockfn2 = jest
      .fn(departmentRepository.save)
      .mockResolvedValue(newDepartment as Department);
    departmentRepository.save = mockfn2;
    const updatedDept = await departmentService.updateDepartment(
      department.id,
      department.name
    );
    if (!updatedDept) return;
    expect(updatedDept.name).toEqual("Human Resources");
  });
  it("should return deleted employee", async () => {
    const department: unknown = {
      id: 4,
      name: "Finance",
      employees: [],
    };

    const mockfn = jest
      .fn(departmentRepository.findOneBy)
      .mockResolvedValue(department as Department);
    departmentRepository.findOneBy = mockfn;
    const mockfn2 = jest
      .fn(departmentRepository.softRemove)
      .mockResolvedValue(department as Department);
    departmentRepository.softRemove = mockfn2;
    const deletedDept = await departmentService.deleteDepartment(4);
    expect(deletedDept.name).toEqual("Finance");
  });
});
