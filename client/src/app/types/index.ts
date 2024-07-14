export interface Users {
    id: number;
    name: string;
    phone: string;
    birthday: string;
    role: string;
    isArchive: boolean;
  }
  
  export interface InitialState {
    users: Users[];
    userById: Users | null;
    isLoading: boolean;
    filterRole: "all" | "cook" | "waiter" | "driver";
    filterIsArchive: boolean;
    sortName: boolean;
    sortBirthday: boolean;
    isError: string;
  }