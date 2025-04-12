import axios from 'axios';

export class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

export class ApiService {
  static EXERCISES_URL = 'https://your-energy.b.goit.study/api/exercises';
  static FILTERS_URL = 'https://your-energy.b.goit.study/api/filters';
  static QUOTE_URL = 'https://your-energy.b.goit.study/api/quote';
  static SUBSCRIBE_URL = 'https://your-energy.b.goit.study/api/subscription';

  static async fetchFilters(filter, page, limit) {
    try {
      const params = {
        filter: filter,
        page: page,
        limit: limit,
      };

      const response = await axios.get(ApiService.FILTERS_URL, {
        params: params,
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            throw new ApiError('Not found.', 404);
          case 500:
            throw new ApiError('Server error.', 500);
          default:
            throw new ApiError(
              'An unknown error occurred.',
              error.response.status
            );
        }
      } else if (error.request) {
        throw new ApiError('No response from the server.', 0);
      } else {
        throw new ApiError('An unexpected error occurred.', 0);
      }
    }
  }
  static async fetchExercises(
    bodypart,
    muscles,
    equipment,
    keyword,
    page,
    limit
  ) {
    try {
      const params = {
        ...(bodypart && { bodypart }),
        ...(muscles && { muscles }),
        ...(equipment && { equipment }),
        ...(keyword && { keyword }),
        page: page,
        limit: limit,
      };

      const response = await axios.get(ApiService.EXERCISES_URL, {
        params: params,
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            throw new ApiError('Not found.', 404);
          case 500:
            throw new ApiError('Server error.', 500);
          default:
            throw new ApiError(
              'An unknown error occurred.',
              error.response.status
            );
        }
      } else if (error.request) {
        throw new ApiError('No response from the server.', 0);
      } else {
        throw new ApiError('An unexpected error occurred.', 0);
      }
    }
  }
  static async fetchExerciseByID(exerciseID) {
    try {
      const response = await axios.get(
        `${ApiService.EXERCISES_URL}/${exerciseID}`
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            throw new ApiError('Bad request (invalid request body).', 400);
          case 404:
            throw new ApiError('Not found.', 404);
          case 500:
            throw new ApiError('Server error.', 500);
          default:
            throw new ApiError(
              'An unknown error occurred.',
              error.response.status
            );
        }
      } else if (error.request) {
        throw new ApiError('No response from the server.', 0);
      } else {
        throw new ApiError('An unexpected error occurred.', 0);
      }
    }
  }
  static async submitExerciseRating(exerciseID, rate, email, review) {
    try {
      const data = {
        rate: rate,
        email: email,
        review: review,
      };

      const response = await axios.patch(
        `${ApiService.EXERCISES_URL}/${exerciseID}/rating`,
        data
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 409:
            throw new ApiError('Such email already exists', 409);
          case 400:
            throw new ApiError('Bad request (invalid request body).', 400);
          case 404:
            throw new ApiError('Such exercise not found.', 404);
          case 500:
            throw new ApiError('Server error', 500);
          default:
            throw new ApiError(
              'An unknown error occurred.',
              error.response.status
            );
        }
      } else if (error.request) {
        throw new ApiError('No response from the server.', 0);
      } else {
        throw new ApiError('An unexpected error occurred.', 0);
      }
    }
  }
  static async fetchQuote() {
    try {
      const response = await axios.get(ApiService.QUOTE_URL);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            throw new ApiError('Not found.', 404);
          case 500:
            throw new ApiError('Server error.', 500);
          default:
            throw new ApiError(
              'An unknown error occurred.',
              error.response.status
            );
        }
      } else if (error.request) {
        throw new ApiError('No response from the server.', 0);
      } else {
        throw new ApiError('An unexpected error occurred.', 0);
      }
    }
  }
  static async addSubscription(email) {
    try {
      const data = {
        email: email,
      };

      const response = await axios.post(ApiService.SUBSCRIBE_URL, data);

      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 409:
            throw new ApiError('Subscription already exists', 409);
          case 400:
            throw new ApiError('Bad request (invalid request body).', 400);
          case 404:
            throw new ApiError('Not found.', 404);
          case 500:
            throw new ApiError('Server error', 500);
          default:
            throw new ApiError(
              'An unknown error occurred.',
              error.response.status
            );
        }
      } else if (error.request) {
        throw new ApiError('No response from the server.', 0);
      } else {
        throw new ApiError('An unexpected error occurred.', 0);
      }
    }
  }
}

export class StorageService {
  static QUOTE_KEY = 'quoteOfTheDay';
  static FAVORITES_KEY = 'favorites';

  static getCurrentDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    return `${day}.${month}.${year}`;
  }

  static storeDailyQuote(quote) {
    const dated_quote = {
      date: StorageService.getCurrentDate(),
      quote: quote,
    };
    try {
      localStorage.setItem(
        StorageService.QUOTE_KEY,
        JSON.stringify(dated_quote)
      );
    } catch (error) {
      throw new Error('Failed to save quote to localStorage');
    }
  }

  static async loadDailyQuote() {
    try {
      const dated_quote = localStorage.getItem(StorageService.QUOTE_KEY);
      if (dated_quote) {
        const { date, quote } = JSON.parse(dated_quote);
        if (date === StorageService.getCurrentDate()) {
          return quote;
        }
      }
      const apiQuote = await ApiService.fetchQuote();
      StorageService.storeDailyQuote(apiQuote);
      return apiQuote;
    } catch (error) {
      throw new Error('Failed to load quote');
    }
  }

  static clearDailyQuote() {
    try {
      localStorage.removeItem(StorageService.QUOTE_KEY);
    } catch (error) {
      throw new Error('Failed to clear quote in localStorage');
    }
  }

  static addExerciseToFavorites(exercise) {
    let favorites = this.loadFavorites();
    favorites.push(exercise);
    this.storeFavorites(favorites);
  }

  static removeExerciseFromFavorites(id) {
    let favorites = this.loadFavorites();
    favorites = favorites.filter(f => f._id != id);
    this.storeFavorites(favorites);
  }

  static storeFavorites(favorites) {
    try {
      localStorage.setItem(
        StorageService.FAVORITES_KEY,
        JSON.stringify(favorites)
      );
    } catch (error) {
      throw new Error('Failed to save favorites to localStorage');
    }
  }

  static loadFavorites() {
    try {
      const favorites = localStorage.getItem(StorageService.FAVORITES_KEY);
      if (favorites) {
        return JSON.parse(favorites);
      } else {
        return [];
      }
    } catch (error) {
      throw new Error('Failed to load favorites');
    }
  }

  static clearFavorites() {
    try {
      localStorage.removeItem(StorageService.FAVORITES_KEY);
    } catch (error) {
      throw new Error('Failed to clear favorites in localStorage');
    }
  }
}
