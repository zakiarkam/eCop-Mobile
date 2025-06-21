import AsyncStorage from '@react-native-async-storage/async-storage';

export interface StoredUserData {
  userId: string;
  userType: 'licence' | 'police';
  fullName: string;
  identificationNo: string;
  email: string;
  role: string;
  status: string;
  idNumber: string;
  licenceNumber?: string;
  policeNumber?: string;
  rank?: string;
  policeStation?: string;
  badgeNo?: string;
  issueDate?: string;
  expiryDate?: string;
  licencePoints?: number;
  policePoints?: string;
  phoneNumber: string;
  vehicleCategories?: Array<{
    category: string;
    issueDate: string;
    expiryDate: string;
  }>;
}

class UserStorageService {
  private static instance: UserStorageService;
  private readonly USER_DATA_KEY = 'user_data';
  private readonly LOGIN_STATUS_KEY = 'is_logged_in';

  private constructor() {}

  public static getInstance(): UserStorageService {
    if (!UserStorageService.instance) {
      UserStorageService.instance = new UserStorageService();
    }
    return UserStorageService.instance;
  }

  async storeUserData(userData: StoredUserData): Promise<void> {
    try {
      await AsyncStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userData));
      await AsyncStorage.setItem(this.LOGIN_STATUS_KEY, 'true');
      console.log('User data stored successfully');
    } catch (error) {
      console.error('Error storing user data:', error);
      throw new Error('Failed to store user data');
    }
  }

  async getUserData(): Promise<StoredUserData | null> {
    try {
      const userData = await AsyncStorage.getItem(this.USER_DATA_KEY);
      if (userData) {
        return JSON.parse(userData) as StoredUserData;
      }
      return null;
    } catch (error) {
      console.error('Error retrieving user data:', error);
      return null;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const loginStatus = await AsyncStorage.getItem(this.LOGIN_STATUS_KEY);
      return loginStatus === 'true';
    } catch (error) {
      console.error('Error checking login status:', error);
      return false;
    }
  }

  async getUserId(): Promise<string | null> {
    const userData = await this.getUserData();
    return userData?.userId || null;
  }

  async getUserType(): Promise<'licence' | 'police' | null> {
    const userData = await this.getUserData();
    return userData?.userType || null;
  }

  async getUserFullName(): Promise<string | null> {
    const userData = await this.getUserData();
    return userData?.fullName || null;
  }

  async getIdentificationNumber(): Promise<string | null> {
    const userData = await this.getUserData();
    return userData?.identificationNo || null;
  }

  async getIdNumber(): Promise<string | null> {
    const userData = await this.getUserData();
    return userData?.idNumber || null;
  }

  async getPhoneNumber(): Promise<string | null> {
    const userData = await this.getUserData();
    return userData?.phoneNumber || null;
  }

  async getLicenceNumber(): Promise<string | null> {
    const userData = await this.getUserData();
    return userData?.licenceNumber || null;
  }

  async getLicencePoints(): Promise<number | null> {
    const userData = await this.getUserData();
    return userData?.licencePoints || null;
  }

  async getPoliceNumber(): Promise<string | null> {
    const userData = await this.getUserData();
    return userData?.policeNumber || null;
  }

  async getPolicePoints(): Promise<string | null> {
    const userData = await this.getUserData();
    return userData?.policePoints || null;
  }

  async getUserEmail(): Promise<string | null> {
    const userData = await this.getUserData();
    return userData?.email || null;
  }

  async getUserRole(): Promise<string | null> {
    const userData = await this.getUserData();
    return userData?.role || null;
  }

  async getUserStatus(): Promise<string | null> {
    const userData = await this.getUserData();
    return userData?.status || null;
  }

  async getPoliceData(): Promise<{
    rank?: string;
    policeStation?: string;
    badgeNo?: string;
  } | null> {
    const userData = await this.getUserData();
    if (userData?.userType === 'police') {
      return {
        rank: userData.rank,
        policeStation: userData.policeStation,
        badgeNo: userData.badgeNo,
      };
    }
    return null;
  }

  async getLicenceData(): Promise<{
    issueDate?: string;
    expiryDate?: string;
    vehicleCategories?: Array<{
      category: string;
      issueDate: string;
      expiryDate: string;
    }>;
  } | null> {
    const userData = await this.getUserData();
    if (userData?.userType === 'licence') {
      return {
        vehicleCategories: userData.vehicleCategories,
        issueDate: userData.issueDate,
        expiryDate: userData.expiryDate,
      };
    }
    return null;
  }

  async updateUserData(updatedData: Partial<StoredUserData>): Promise<void> {
    try {
      const currentData = await this.getUserData();
      if (currentData) {
        const newData = {...currentData, ...updatedData};
        await this.storeUserData(newData);
      } else {
        throw new Error('No existing user data found');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      throw new Error('Failed to update user data');
    }
  }

  async clearUserData(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.USER_DATA_KEY);
      await AsyncStorage.removeItem(this.LOGIN_STATUS_KEY);
      console.log('User data cleared successfully');
    } catch (error) {
      console.error('Error clearing user data:', error);
      throw new Error('Failed to clear user data');
    }
  }

  async getAllStoredData(): Promise<{
    userData: StoredUserData | null;
    isLoggedIn: boolean;
  }> {
    const userData = await this.getUserData();
    const isLoggedIn = await this.isLoggedIn();

    return {
      userData,
      isLoggedIn,
    };
  }
}

export const userStorageService = UserStorageService.getInstance();
export default UserStorageService;
