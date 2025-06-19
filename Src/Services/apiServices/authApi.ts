export interface FirstTimeLoginRequest {
  identificationNo: string;
  email: string;
}

export interface FirstTimeLoginResponse {
  success: boolean;
  message: string;
  data?: {
    fullName: string;
    userType: string;
  };
}

export interface VerifyTempPasswordRequest {
  identificationNo: string;
  temporaryPassword: string;
}

export interface VerifyTempPasswordResponse {
  success: boolean;
  message: string;
  data?: {
    fullName: string;
    userId: string;
    userType: string;
  };
}

export interface SetNewPasswordRequest {
  identificationNo: string;
  newPassword: string;
  confirmPassword: string;
}

export interface SetNewPasswordResponse {
  success: boolean;
  message: string;
}

export interface LoginRequest {
  identificationNo: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    fullName: string;
    userId: string;
    userType: string;
    token?: string;
    user: {
      fullName: string;
      nameWithInitials: string;
      identificationNo?: string;
      email: string;
      role: string;
      userType: string;
      status: string;
      licenceNumber?: string;
      idNumber: string;
      issueDate: string;
      expiryDate: string;
      vehicleCategories?: Array<{
        category: string;
        issueDate: string;
        expiryDate: string;
      }>;
      policeNumber?: string;
      rank?: string;
      policeStation?: string;
      badgeNo?: string;
    };
  };
}

class FirstTimeLoginApiService {
  private baseUrl = 'http://192.168.8.135:3000/api';

  private async safeJsonParse(response: Response): Promise<any> {
    const text = await response.text();

    if (!text || text.trim() === '') {
      throw new Error('Empty response from server');
    }

    try {
      return JSON.parse(text);
    } catch (error) {
      console.error('Failed to parse JSON response:', text);
      throw new Error(`Invalid JSON response: ${text.substring(0, 100)}...`);
    }
  }

  private async handleApiError(response: Response): Promise<never> {
    let errorMessage = `HTTP error! status: ${response.status} - ${response.statusText}`;

    try {
      const errorResult = await this.safeJsonParse(response);
      // Use the specific error message from the server if available
      if (errorResult && errorResult.message) {
        errorMessage = errorResult.message;
      }
    } catch (parseError) {
      // If we can't parse the error response, use the default HTTP error message
      console.error('Could not parse error response:', parseError);
    }

    throw new Error(errorMessage);
  }

  private determineUserType(
    identificationNo: string,
  ): 'licence' | 'police' | 'unknown' {
    if (
      identificationNo.toUpperCase().startsWith('P') ||
      identificationNo.toUpperCase().startsWith('POL')
    ) {
      return 'police';
    } else if (
      identificationNo.toUpperCase().startsWith('L') ||
      identificationNo.toUpperCase().startsWith('LIC')
    ) {
      return 'licence';
    }

    return 'unknown';
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      console.log('Attempting login with data:', {...data, password: '***'});

      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Login response status:', response.status);

      if (!response.ok) {
        await this.handleApiError(response);
      }

      const result: LoginResponse = await this.safeJsonParse(response);
      console.log('Login successful');

      return result;
    } catch (error) {
      console.error('Error during login:', error);

      if (
        error instanceof TypeError &&
        error.message.includes('Network request failed')
      ) {
        throw new Error(
          'Network connection failed. Please check your internet connection.',
        );
      } else if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('An unexpected error occurred during login.');
      }
    }
  }

  async requestTemporaryPassword(
    data: FirstTimeLoginRequest,
  ): Promise<FirstTimeLoginResponse> {
    try {
      console.log('Requesting temporary password with data:', data);

      const response = await fetch(`${this.baseUrl}/auth/first-time-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        await this.handleApiError(response);
      }

      const result: FirstTimeLoginResponse = await this.safeJsonParse(response);
      console.log('Parsed result:', result);

      return result;
    } catch (error) {
      console.error('Error requesting temporary password:', error);

      if (
        error instanceof TypeError &&
        error.message.includes('Network request failed')
      ) {
        throw new Error(
          'Network connection failed. Please check your internet connection.',
        );
      } else if (error instanceof Error) {
        throw error; // Re-throw the original error with specific message
      } else {
        throw new Error(
          'An unexpected error occurred while requesting temporary password.',
        );
      }
    }
  }

  async verifyTemporaryPassword(
    data: VerifyTempPasswordRequest,
  ): Promise<VerifyTempPasswordResponse> {
    try {
      console.log('Verifying temporary password with data:', data);

      const response = await fetch(
        `${this.baseUrl}/auth/verify-temp-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      console.log('Response status:', response.status);

      if (!response.ok) {
        await this.handleApiError(response);
      }

      const result: VerifyTempPasswordResponse = await this.safeJsonParse(
        response,
      );
      return result;
    } catch (error) {
      console.error('Error verifying temporary password:', error);

      if (
        error instanceof TypeError &&
        error.message.includes('Network request failed')
      ) {
        throw new Error(
          'Network connection failed. Please check your internet connection.',
        );
      } else if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          'An unexpected error occurred while verifying temporary password.',
        );
      }
    }
  }

  async setNewPassword(
    data: SetNewPasswordRequest,
  ): Promise<SetNewPasswordResponse> {
    try {
      console.log('Setting new password with data:', {
        ...data,
        newPassword: '***',
        confirmPassword: '***',
      });

      const response = await fetch(`${this.baseUrl}/auth/set-new-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        await this.handleApiError(response);
      }

      const result: SetNewPasswordResponse = await this.safeJsonParse(response);
      return result;
    } catch (error) {
      console.error('Error setting new password:', error);

      if (
        error instanceof TypeError &&
        error.message.includes('Network request failed')
      ) {
        throw new Error(
          'Network connection failed. Please check your internet connection.',
        );
      } else if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(
          'An unexpected error occurred while setting new password.',
        );
      }
    }
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword(password: string): string | null {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    return null;
  }

  validateIdentificationNo(identificationNo: string): string | null {
    if (!identificationNo || identificationNo.trim().length === 0) {
      return 'Identification number is required';
    }

    if (identificationNo.length < 3) {
      return 'Identification number is too short';
    }

    return null;
  }

  getUserTypeDisplayName(userType: string): string {
    switch (userType) {
      case 'licence':
        return 'Licence Holder';
      case 'police':
        return 'Police Officer';
      default:
        return 'User';
    }
  }
}

export const firstTimeLoginApiService = new FirstTimeLoginApiService();
export default FirstTimeLoginApiService;
