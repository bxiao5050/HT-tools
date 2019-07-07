# imports
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score


class Linear():

    def fit(self, ax = None, x = None, y = None, color = None):
        if x is None:
            # generate random data-set
            np.random.seed(0)
            self.x = np.random.rand(100, 1)
            self.y = 2 + 3 * self.x + np.random.rand(100, 1)
        else:
            self.x, self.y = x, y
            self.color = color
        # sckit-learn implementation

        # Model initialization
        regression_model = LinearRegression()
        # Fit the data(train the model)
        regression_model.fit(self.x, self.y)
        # Predict
        y_predicted = regression_model.predict(self.x)

        # model evaluation
        rmse = mean_squared_error(self.y, y_predicted)
        r2 = r2_score(self.y, y_predicted)

        # printing values
        # print('Slope:' ,regression_model.coef_)
        # print('Intercept:', regression_model.intercept_)
        # print('Root mean squared error: ', rmse)
        # print('R2 score: ', r2)

        slope = regression_model.coef_[0][0]
        intercept = regression_model.intercept_[0]
        error = rmse

        # plotting values

        # data points
        if ax is not None:
            ax.scatter(self.x, self.y, s=10)
        # self.abline(slope, intercept)

        return slope, intercept, error


        # predicted values

    def abline(self, slope, intercept):
        """Plot a line from slope and intercept"""

        x_vals = np.array(self.ax.get_xlim())
        y_vals = intercept + slope * x_vals

        # self.ax.plot(x_vals, y_vals, ':', color= self.color)

    def intersection(self, x = None, ax = None, slope1 = None, intercept1 = None, slope2 = None, intercept2 = None):
        f = intercept1 + slope1 * x
        g = intercept2 + slope2 * x

        idx = np.argwhere(np.diff(np.sign(g - f))).flatten()

        index = np.where(x>=x[idx])
        if ax is not None:
            ax.plot(x, f, ':')
            ax.plot(x[index], g[index], ':')
            ax.plot(x[idx], f[idx], 'ro')

        return x[idx][0]
