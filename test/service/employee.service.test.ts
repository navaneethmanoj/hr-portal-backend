import { when } from "jest-when";
import Employee from "../../src/entity/employee.entity";
import EmployeeRepository from "../../src/repository/employee.repository";
import EmployeeService from "../../src/service/employee.service";
import { Role } from "../../src/utils/role.enum";
import DepartmentRepository from "../../src/repository/department.repository";
import Department from "../../src/entity/department.entity";
import Address from "../../src/entity/address.entity";

describe("Employee Service", () => {
  let employeeRepository: EmployeeRepository;
  let departmentRepository: DepartmentRepository;
  let employeeService: EmployeeService;
  beforeAll(() => {
    const dataSource = {
      getRepository: jest.fn(),
    };
    employeeRepository = new EmployeeRepository(
      dataSource.getRepository(Employee)
    ) as jest.Mocked<EmployeeRepository>;
    departmentRepository = new DepartmentRepository(
      dataSource.getRepository(Department)
    ) as jest.Mocked<DepartmentRepository>;
    employeeService = new EmployeeService(employeeRepository);
  });

  it("should return all employees", async () => {
    const mockfn = jest.fn(employeeRepository.find).mockResolvedValue([]);
    employeeRepository.find = mockfn;

    const users = await employeeRepository.find();

    expect(users).toEqual([]);
    expect(mockfn).toHaveBeenCalledTimes(1);
  });

  it("should return an employee", async () => {
    const employee = {
      id: 10,
      email: "navaneeth@gmail.com",
      name: "Navaneeth",
    };
    const mockfn = jest.fn();
    when(mockfn)
      .calledWith({ id: 10 })
      .mockResolvedValue(employee as Employee)
      .calledWith({ id: 8 })
      .mockResolvedValue({ id: 8, name: "Nalin" } as Employee);
    employeeRepository.findOneBy = mockfn;

    const user1 = await employeeService.getEmployeeById(1);
    const user2 = await employeeService.getEmployeeById(2);
    if (!user1 || !user2) return;
    expect(user1.name).toEqual("Navaneeth");
    expect(user2.name).toEqual("Nalin");
    expect(mockfn).toHaveBeenCalledTimes(2);
  });
  it("should return the created employee", async () => {
    let address = new Address();
    address.line1 = "Thrissur";
    address.pincode = "680631";
    const employee = {
      id: 12,
      email: "johndoe@gmail.com",
      name: "Jon Doe",
      age: 24,
      address: address,
      password: "asasad",
      role: Role.HR,
    };
    // const department = {
    //   name: "HR",
    // };
    const mockfn = jest
      .fn(employeeRepository.save)
      .mockResolvedValue(employee as Employee);
    employeeRepository.save = mockfn;
    // const mockfn2 = jest
    //   .fn(departmentRepository.findOneBy)
    //   .mockResolvedValue(department as Department);
    // departmentRepository.findOneBy = mockfn2;
    const createdUser = await employeeService.createEmployee(
      employee.name,
      employee.email,
      employee.age,
      employee.address,
      employee.password,
      employee.role,
      "HR"
    );
    if (!createdUser) return;
    expect(createdUser.email).toEqual("johndoe@gmail.com");
  });
  it("should return updated employee", async () => {
    let address = new Address();
    address.line1 = "Thrissur";
    address.pincode = "680631";
    const department: Partial<Department> = {
      name: "HR",
    };
    const employee: any = {
      id: 12,
      email: "johndoe@gmail.com",
      name: "Jon Doe",
      age: 24,
      address: address,
      password: "asasad",
      role: Role.HR,
      department: department,
    };
    const employee2 = {
      ...employee,
      id: 12,
      name: "Jane Doe",
    };
    console.log(employee2);
    const mockfn1 = jest
      .fn(employeeRepository.findOneBy)
      .mockResolvedValue(employee as Employee);
    employeeRepository.findOneBy = mockfn1;
    const mockfn2 = jest
      .fn(employeeRepository.save)
      .mockResolvedValue(employee2 as Employee);
    employeeRepository.save = mockfn2;
    const updatedUser = await employeeService.updateEmployee(
      employee.id as number,
      employee.name,
      employee.email,
      employee.age,
      employee.address,
      employee.role
    );
    if (!updatedUser) return null;
    expect(updatedUser.name).toEqual("Jane Doe");
  });
  it("should return deleted employee", async () => {
    let address = new Address();
    address.line1 = "Thrissur";
    address.pincode = "680631";
    const department: Partial<Department> = {
      name: "HR",
    };
    const employee: any = {
      id: 12,
      email: "johndoe@gmail.com",
      name: "Jon Doe",
      age: 24,
      address: address,
      password: "asasad",
      role: Role.HR,
      department: department,
    };
    const mockfn = jest.fn(employeeRepository.softRemove).mockResolvedValue(employee as Employee)
    employeeRepository.
  });
});
