package com.foodapp

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactRootView // Import ReactRootView
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.zoontek.rnbootsplash.RNBootSplash
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView // Import RNGestureHandlerEnabledRootView

class MainActivity : ReactActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    // This line initializes and displays the splash screen
    RNBootSplash.init(this, R.style.BootTheme)
    super.onCreate(savedInstanceState)
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "foodapp"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   *
   * IMPORTANT: The createReactActivityDelegate method is overridden here to
   * integrate react-native-gesture-handler. It ensures that the root view
   * of your React Native application is an RNGestureHandlerEnabledRootView,
   * which is necessary for gesture handling to work correctly.
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return object : DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled) {
      override fun createRootView(): ReactRootView {
        // Return an instance of RNGestureHandlerEnabledRootView for gesture handling
        return RNGestureHandlerEnabledRootView(this@MainActivity)
      }
    }
  }
}
